// src/plan/plan.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Plan } from 'src/schemas/plan.schema';
import { Model } from 'mongoose';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { SavePlansDto } from './dto/save-plans.dto';
import { ApiClientService } from '../api-client/api-client.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlanService {
  constructor(
    @InjectModel(Plan.name) private planModel: Model<Plan>,
    private apiClient: ApiClientService,
    private configService: ConfigService,
  ) {}

  // === PRICE & NETWORK ===
  private readonly PRICE_MAP: Record<string, number> = {
    '10GB': 20.54,
    '15GB': 24.6,
    '29GB': 28.53,
    '40GB': 33.24,
    '65GB': 37.55,
    '100GB': 46.4,
    '120GB': 54.86,
    '150GB': 59.89,
  };

  private extractGb(planName: string): string | null {
    const match = planName.match(/(\d+)GB/i);
    return match ? `${match[1]}GB` : null;
  }

  private getPrice(planName: string): number {
    const gb = this.extractGb(planName);
    if (gb && this.PRICE_MAP[gb] !== undefined) return this.PRICE_MAP[gb];
    if (planName.includes('32GB')) return 35.0;
    return 0;
  }

  private inferNetwork(planName: string): '4G' | '5G' {
    return /40GB|65GB|100GB|120GB|150GB/i.test(planName) ? '5G' : '4G';
  }

  // === CRUD ===
  async getAllPlans(groupNo?: string): Promise<Plan[]> {
    const filter: any = { isActive: true };
    if (groupNo) filter.groupNo = groupNo;
    return this.planModel.find(filter).sort({ price: 1 }).lean().exec();
  }

  async findOne(planNo: number): Promise<Plan> {
    const plan = await this.planModel
      .findOne({ planNo, isActive: true })
      .lean();
    if (!plan) throw new NotFoundException(`Plan ${planNo} not found`);
    return plan;
  }

  async create(dto: CreatePlanDto): Promise<Plan> {
    const exists = await this.planModel.findOne({ planNo: dto.planNo });
    if (exists) throw new Error(`Plan ${dto.planNo} already exists`);

    const plan = new this.planModel({
      ...dto,
      network: dto.network || this.inferNetwork(dto.planName),
    });
    return plan.save();
  }

  async update(planNo: number, dto: UpdatePlanDto): Promise<Plan> {
    const update: any = { ...dto };
    if (dto.planName) update.network = this.inferNetwork(dto.planName);

    const plan = await this.planModel.findOneAndUpdate(
      { planNo },
      { $set: update },
      { new: true },
    );

    if (!plan) throw new NotFoundException(`Plan ${planNo} not found`);
    return plan;
  }

  async remove(planNo: number): Promise<void> {
    const result = await this.planModel.updateOne(
      { planNo },
      { isActive: false },
    );
    if (result.modifiedCount === 0) {
      throw new NotFoundException(`Plan ${planNo} not found`);
    }
  }

  // === NEW: SAVE PLANS INTO DB ===
  async savePlans(dto: SavePlansDto): Promise<{ saved: number }> {
    const operations = dto.plans.map((p) => ({
      updateOne: {
        filter: { planNo: p.planNo },
        update: {
          $set: {
            planName: p.planName,
            usageType: p.usageType,
            price: this.getPrice(p.planName),
            network: this.inferNetwork(p.planName),
            groupNo: dto.groupNo,
            groupName: dto.groupName,
            isActive: true,
          },
        },
        upsert: true,
      },
    }));

    const result = await this.planModel.bulkWrite(operations);
    return { saved: result.upsertedCount + result.modifiedCount };
  }

  // === SYNC FROM SOAP ===
  async syncFromSoap(): Promise<{ synced: number }> {
    const result = await this.apiClient.soapCall<any>(
      '/UtbPlan',
      { group: { groupNo: this.configService.get('groupNo') } },
      'getGroupPlans',
    );

    if (!('return' in result) || !result.return.groupPlan) {
      throw new Error('Invalid SOAP response');
    }

    const groupInfo = {
      groupNo: result.return.groupNo,
      groupName: result.return.groupName,
    };

    await this.upsertPlansFromSoap(result.return.groupPlan, groupInfo);
    return { synced: result.return.groupPlan.length };
  }

  async upsertPlansFromSoap(
    soapPlans: any[],
    groupInfo: { groupNo: string; groupName: string },
  ) {
    const operations = soapPlans.map((p) => ({
      updateOne: {
        filter: { planNo: p.planNo },
        update: {
          $set: {
            planName: p.planName,
            usageType: p.usageType,
            price: this.getPrice(p.planName),
            network: this.inferNetwork(p.planName),
            groupNo: groupInfo.groupNo,
            groupName: groupInfo.groupName,
            isActive: true,
          },
        },
        upsert: true,
      },
    }));

    if (operations.length > 0) {
      await this.planModel.bulkWrite(operations);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bill } from '../schemas/bill.schema';
import { BillDto } from './dto/bill.dto';
import { Types } from 'mongoose';

@Injectable()
export class BillService {
  constructor(@InjectModel('Bill') private billModel: Model<Bill>) {}

  async create(userId: string, billDto: BillDto): Promise<Bill> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid user ID');
    }
    const bill = new this.billModel({
      userId: new Types.ObjectId(userId),
      ...billDto,
    });
    return bill.save();
  }

  async findByUserId(userId: string): Promise<Bill | null> {
    if (!Types.ObjectId.isValid(userId)) {
      return null;
    }
    return this.billModel.findOne({ userId: new Types.ObjectId(userId) });
  }
}

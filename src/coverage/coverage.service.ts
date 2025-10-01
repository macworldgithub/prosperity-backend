import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coverage } from '../schemas/coverage.schema';
import { CreateCoverageDto } from './dto/create-coverage.dto';

@Injectable()
export class CoverageService {
  constructor(@InjectModel('Coverage') private coverageModel: Model<Coverage>) {}

  async findByZip(zip: string): Promise<Coverage | null> {
    return this.coverageModel.findOne({ zip });
  }

  async create(createCoverageDto: CreateCoverageDto): Promise<Coverage> {
    const coverage = new this.coverageModel(createCoverageDto);
    return coverage.save();
  }
}
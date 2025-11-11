import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coverage } from '../schemas/coverage.schema';
import { CreateCoverageDto } from './dto/create-coverage.dto';

@Injectable()
export class CoverageService {
  // prefer injecting by model name: InjectModel(Coverage.name) works if you registered it that way
  constructor(
    @InjectModel(Coverage.name) private coverageModel: Model<Coverage>,
  ) {}

  // return multiple matches
  async findByZip(zip: string): Promise<Coverage[]> {
    return this.coverageModel.find({ zip }).exec();
  }

  async create(createCoverageDto: CreateCoverageDto): Promise<Coverage> {
    const coverage = new this.coverageModel(createCoverageDto);
    return coverage.save();
  }
}

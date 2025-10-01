import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Coverage, CoverageSchema } from '../schemas/coverage.schema';
import { CoverageService } from './coverage.service';
import { CoverageController } from './coverage.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Coverage', schema: CoverageSchema }])],
  providers: [CoverageService],
  controllers: [CoverageController],
  exports: [CoverageService],
})
export class CoverageModule {}
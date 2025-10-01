import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Bill, BillSchema } from '../schemas/bill.schema';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Bill', schema: BillSchema }])],
  providers: [BillService],
  controllers: [BillController],
  exports: [BillService],
})
export class BillModule {}
import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ApiClientModule } from '../api-client/api-client.module';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [ApiClientModule, HttpModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}

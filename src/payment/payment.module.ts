import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ApiClientModule } from '../api-client/api-client.module';
import { HttpModule } from '@nestjs/axios';
import { GoogleSheetsService } from 'src/google-sheets/google-sheets.service';
import { Payment, PaymentSchema } from 'src/schemas/payment.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailService } from 'src/common/services/email.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    ApiClientModule,
    HttpModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService, GoogleSheetsService, EmailService],
})
export class PaymentModule {}

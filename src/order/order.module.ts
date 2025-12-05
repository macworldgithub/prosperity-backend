import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ApiClientModule } from '../api-client/api-client.module';
import { BullModule } from '@nestjs/bull';
import { Order, OrderSchema } from '../schemas/order.schema';
import { GoogleSheetsService } from 'src/google-sheets/google-sheets.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailService } from 'src/common/services/email.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ApiClientModule,
    BullModule.registerQueue({
      name: 'order-activation',
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService, GoogleSheetsService, EmailService],
})
export class OrderModule {}

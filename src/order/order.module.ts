import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ApiClientModule } from '../api-client/api-client.module';
import { BullModule } from '@nestjs/bull';
import { Order, OrderSchema } from '../schemas/order.schema';
import { GoogleSheetsService } from 'src/google-sheets/google-sheets.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailService } from 'src/common/services/email.service';
import { CustomerService } from 'src/customer/customer.service';
import { Customer, CustomerSchema } from 'src/schemas/customer.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Customer.name, schema: CustomerSchema },
      { name: User.name, schema: UserSchema },
    ]),
    ApiClientModule,
    BullModule.registerQueue({
      name: 'order-activation',
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService, GoogleSheetsService, EmailService, CustomerService],
})
export class OrderModule {}

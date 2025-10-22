import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ApiClientModule } from '../api-client/api-client.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ApiClientModule,
    BullModule.registerQueue({
      name: 'order-activation',
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}

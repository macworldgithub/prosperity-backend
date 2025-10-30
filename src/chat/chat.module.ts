// import { Module } from '@nestjs/common';
// import { ChatService } from './chat.service';
// import { ChatController } from './chat.controller';

// @Module({
//   controllers: [ChatController],
//   providers: [ChatService],
// })
// export class ChatModule {}

import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { CustomerModule } from '../customer/customer.module';
import { NumberModule } from '../number/number.module';

@Module({
  imports: [CustomerModule, NumberModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}

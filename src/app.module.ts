// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { AuthModule } from './auth/auth.module';
// import { UserModule } from './user/user.module';
// import { AddressModule } from './address/address.module';
// import { CoverageModule } from './coverage/coverage.module';
// import { QueryModule } from './query/query.module';
// import { BillModule } from './bill/bill.module';
// import { ChatModule } from './chat/chat.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//     }),
//     MongooseModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => {
//         const uri = configService.get<string>('MONGO_URI');
//         if (!uri) {
//           throw new Error('MONGO_URI is not defined in environment variables');
//         }
//         return { uri };
//       },
//       inject: [ConfigService],
//     }),
//     AuthModule,
//     UserModule,
//     AddressModule,
//     CoverageModule,
//     QueryModule,
//     BillModule,
//     ChatModule,
//   ],
// })
// export class AppModule {}
// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { CoverageModule } from './coverage/coverage.module';
import { QueryModule } from './query/query.module';
import { BillModule } from './bill/bill.module';
import { ChatModule } from './chat/chat.module';
import { ApiClientModule } from './api-client/api-client.module';
import { CredentialsModule } from './credentials/credentials.module';
import { CustomerModule } from './customer/customer.module';
import { NumberModule } from './number/number.module';
import { OrderModule } from './order/order.module';
import { OtpModule } from './otp/otp.module';
import { PaymentModule } from './payment/payment.module';
import { QrCodeModule } from './qrcode/qrcode.module';
import { EmailModule } from './email/email.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        if (!uri) {
          throw new Error('MONGO_URI is not defined in environment variables');
        }
        return { uri };
      },
      inject: [ConfigService],
    }),

    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          url: configService.get('REDIS_URL'),
          maxRetriesPerRequest: null,
        },
      }),
      inject: [ConfigService],
    }),

    LoggerModule,
    ApiClientModule,
    CredentialsModule,
    CustomerModule,
    NumberModule,
    OrderModule,
    OtpModule,
    PaymentModule,
    QrCodeModule,
    EmailModule,
    AuthModule,
    UserModule,
    AddressModule,
    CoverageModule,
    QueryModule,
    BillModule,
    ChatModule,
  ],
})
export class AppModule {}

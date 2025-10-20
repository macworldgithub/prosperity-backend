import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { CoverageModule } from './coverage/coverage.module';
import { QueryModule } from './query/query.module';
import { BillModule } from './bill/bill.module';
import { ChatModule } from './chat/chat.module';

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
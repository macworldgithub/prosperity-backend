// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { CustomerService } from './customer.service';
// import { CustomerController } from './customer.controller';
// import { CustomerSchema } from '../schemas/customer.schema';
// import { ApiClientModule } from '../api-client/api-client.module';

// @Module({
//   imports: [
//     ApiClientModule,
//     MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }]),
//   ],
//   controllers: [CustomerController],
//   providers: [CustomerService],
// })
// export class CustomerModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from '../schemas/customer.schema';
import { ApiClientModule } from '../api-client/api-client.module';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { User, UserSchema } from 'src/schemas/user.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: User.name, schema: UserSchema },
    ]),
    ApiClientModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService], // Add this to export the service
})
export class CustomerModule {}

// // src/plan/plan.module.ts
// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Plan, PlanSchema } from 'src/schemas/plan.schema';
// import { PlanService } from './plan.service';
// import { PlanController } from './plan.controller';
// import { ApiClientService } from '../api-client/api-client.service';
// import { CredentialsService } from 'src/credentials/credentials.service';
// import { Credential, CredentialSchema } from 'src/schemas/credential.schema';
// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: Plan.name, schema: PlanSchema }]),
//     MongooseModule.forFeature([
//       { name: Credential.name, schema: CredentialSchema },
//     ]),
//   ],
//   controllers: [PlanController],
//   providers: [PlanService, ApiClientService, CredentialsService],
//   exports: [PlanService],
// })
// export class PlanModule {}

// src/plan/plan.module.ts
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Plan, PlanSchema } from '../schemas/plan.schema';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { ApiClientService } from '../api-client/api-client.service';
import { CredentialsService } from '../credentials/credentials.service';
import { Credential, CredentialSchema } from '../schemas/credential.schema';

@Global() // ← THIS IS THE KEY
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plan.name, schema: PlanSchema }]),
    MongooseModule.forFeature([
      { name: Credential.name, schema: CredentialSchema },
    ]),
  ],
  controllers: [PlanController],
  providers: [PlanService, ApiClientService, CredentialsService],
  exports: [PlanService], // ← Still export it so Nest knows it's available globally
})
export class PlanModule {}

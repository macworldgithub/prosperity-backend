// import { Module } from '@nestjs/common';
// import { NumberService } from './number.service';
// import { NumberController } from './number.controller';
// import { ApiClientModule } from '../api-client/api-client.module';

// @Module({
//   imports: [ApiClientModule],
//   controllers: [NumberController],
//   providers: [NumberService],
// })
// export class NumberModule {}

import { Module } from '@nestjs/common';
import { ApiClientModule } from '../api-client/api-client.module';
import { NumberController } from './number.controller';
import { NumberService } from './number.service';
@Module({
  imports: [ApiClientModule],
  controllers: [NumberController],
  providers: [NumberService],
  exports: [NumberService], // Ensure export
})
export class NumberModule {}

import { Module } from '@nestjs/common';
import { QueryService } from './query.service';
import { QueryController } from './query.controller';
import { UserModule } from '../user/user.module';
import { CoverageModule } from '../coverage/coverage.module';
import { BillModule } from '../bill/bill.module';

@Module({
  imports: [UserModule, CoverageModule, BillModule],
  providers: [QueryService],
  controllers: [QueryController],
})
export class QueryModule {}
import { Module } from '@nestjs/common';
import { ApiClientService } from './api-client.service';
import { CredentialsModule } from '../credentials/credentials.module';

@Module({
  imports: [CredentialsModule],
  providers: [ApiClientService],
  exports: [ApiClientService],
})
export class ApiClientModule {}

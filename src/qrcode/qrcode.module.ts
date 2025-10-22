import { Module } from '@nestjs/common';
import { QrCodeService } from './qrcode.service';
import { QrCodeController } from './qrcode.controller';
import { ApiClientModule } from '../api-client/api-client.module';

@Module({
  imports: [ApiClientModule],
  controllers: [QrCodeController],
  providers: [QrCodeService],
})
export class QrCodeModule {}

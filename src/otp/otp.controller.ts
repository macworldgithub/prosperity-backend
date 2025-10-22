import { Controller, Post, Body } from '@nestjs/common';
import { OtpService } from './otp.service';
import { formatResponse } from '../common/utils/response-formatter';
import { GetOtpDto } from './dto/get-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('api/v1/auth')
export class OtpController {
  constructor(private otpService: OtpService) {}

  @Post('otp')
  @ApiOperation({ summary: 'Get OTP for verification on provided number' })
  @ApiBody({ type: GetOtpDto })
  @ApiResponse({ status: 200, description: 'OTP sent successfully' })
  async getOTP(@Body() getOtpDto: GetOtpDto) {
    const result = await this.otpService.getOTP(getOtpDto);
    return formatResponse(result.return || result, 'OTP sent successfully');
  }

  @Post('otp/verify')
  @ApiOperation({ summary: 'Verify OTP' })
  @ApiBody({ type: VerifyOtpDto })
  @ApiResponse({ status: 200, description: 'OTP verified successfully' })
  async verifyOTP(@Body() verifyOtpDto: VerifyOtpDto) {
    const result = await this.otpService.verifyOTP(verifyOtpDto);
    return formatResponse(result.return || result, 'OTP verified successfully');
  }
}

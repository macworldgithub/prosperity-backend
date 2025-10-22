import { Controller, Post, Param, Body } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('credentials')
@Controller('api/v1/credentials')
export class CredentialsController {
  constructor(private credentialsService: CredentialsService) {}

  @Post(':username')
  @ApiOperation({ summary: 'Update password for a username' })
  @ApiParam({ name: 'username', description: 'Username to update' })
  @ApiBody({
    type: Object,
    description: '{ currentPassword: string, newPassword: string }',
  })
  @ApiResponse({ status: 200, description: 'Password updated successfully' })
  @ApiResponse({
    status: 400,
    description: 'Invalid current password or username not found',
  })
  async updatePassword(
    @Param('username') username: string,
    @Body() body: { currentPassword: string; newPassword: string },
  ) {
    await this.credentialsService.updatePassword(
      username,
      body.currentPassword,
      body.newPassword,
    );
    return { message: 'Password updated successfully.' };
  }
}

import { Controller, Put, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AddressService } from './address.service';
import { UpdateAddressDto } from './dto/update-address.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('address')
@Controller('address')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Put('update')
  @ApiOperation({ summary: 'Update the authenticated user\'s address' })
  @ApiBody({ type: UpdateAddressDto })
  @ApiResponse({ status: 200, description: 'Address updated successfully', type: Object })
  @ApiResponse({ status: 400, description: 'Invalid address data' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing JWT' })
  async update(@Req() req, @Body() updateAddressDto: UpdateAddressDto) {
    const address = await this.addressService.update(req.user.userId, updateAddressDto.newAddress);
    return { message: 'Address updated', address };
  }

  @Get()
  @ApiOperation({ summary: 'Get the authenticated user\'s address' })
  @ApiResponse({ status: 200, description: 'User address details', type: Object })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing JWT' })
  @ApiResponse({ status: 404, description: 'Address not found' })
  async get(@Req() req) {
    const address = await this.addressService.findByUserId(req.user.userId);
    if (!address) {
      return { message: 'Address not found' };
    }
    return address;
  }
}
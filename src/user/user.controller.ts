// import { Controller, Get, Put, Body, Req, UseGuards } from '@nestjs/common';
// import { UserService } from './user.service';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
// import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

// @ApiTags('user')
// @Controller('user')
// export class UserController {
//   constructor(private userService: UserService) {}

//   @UseGuards(JwtAuthGuard)
//   @ApiBearerAuth()
//   @Get('me')
//   @ApiOperation({ summary: 'Get details of the authenticated user' })
//   @ApiResponse({ status: 200, description: 'User details', type: Object })
//   @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing JWT' })
//   @ApiResponse({ status: 404, description: 'User not found' })
//   async getMe(@Req() req) {
//     const user = await this.userService.findById(req.user.userId);
//     if (!user) {
//       return { message: 'User not found' };
//     }
//     return user;
//   }

//   @UseGuards(JwtAuthGuard)
//   @ApiBearerAuth()
//   @Put('update')
//   @ApiOperation({ summary: 'Update user profile details' })
//   @ApiBody({ type: UpdateUserDto })
//   @ApiResponse({ status: 200, description: 'User profile updated successfully', type: Object })
//   @ApiResponse({ status: 400, description: 'Invalid input data' })
//   @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing JWT' })
//   @ApiResponse({ status: 404, description: 'User not found' })
//   async update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
//     const user = await this.userService.update(req.user.userId, updateUserDto);
//     if (!user) {
//       return { message: 'User not found' };
//     }
//     return { message: 'User updated', user };
//   }
// }
import {
  Controller,
  Get,
  Put,
  Body,
  Req,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CustomerService } from '../customer/customer.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private customerService: CustomerService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  @ApiOperation({ summary: 'Get details of the authenticated user' })
  @ApiResponse({ status: 200, description: 'User details', type: Object })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getMe(@Req() req) {
    const user = await this.userService.findById(req.user.userId);
    if (!user) {
      return { message: 'User not found' };
    }
    let customer: any = null;
    if (user.custNo) {
      const customerRes = await this.customerService.getDetails(user.custNo);
      if (!('error' in customerRes)) {
        customer = customerRes.return;
      }
    }
    return { user, customer };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('update')
  @ApiOperation({ summary: 'Update user profile details' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'User profile updated successfully',
    type: Object,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing JWT',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(req.user.userId, updateUserDto);
    if (!user) {
      return { message: 'User not found' };
    }
    return { message: 'User updated', user };
  }
}

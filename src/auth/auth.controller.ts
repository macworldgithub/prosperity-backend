// import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { LoginDto } from '../user/dto/login.dto';
// import { CreateUserDto } from '../user/dto/create-user.dto';
// import { AuthGuard } from '@nestjs/passport';
// import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Put,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../user/dto/login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ForgotPinDto } from './dto/forgot-pin.dto';
import { ChangePinDto } from './dto/change-pin.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Login with email and PIN' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'JWT token returned upon successful login',
    type: Object,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid email or PIN',
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('biometric-login')
  @ApiOperation({
    summary:
      'Login with biometric authentication (assumes client-side verification)',
  })
  @ApiResponse({
    status: 200,
    description: 'JWT token returned for biometric-enrolled user',
    type: Object,
  })
  @ApiResponse({ status: 404, description: 'No biometric enrolled user found' })
  async biometricLogin() {
    const user = await this.authService.validateBiometricUser();
    if (user) {
      return this.authService.login(user);
    }
    return { message: 'No biometric enrolled user found' };
  }

  @Post('signup')
  @ApiOperation({
    summary:
      'Sign up a new user with name, email, PIN, address, and optional biometric enrollment',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User created successfully, returns user ID',
    type: Object,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
  @Post('forgot-pin')
  @ApiOperation({ summary: 'Request new PIN via email (use email or custNo)' })
  @ApiBody({ type: ForgotPinDto })
  @ApiResponse({ status: 200, description: 'If account exists, new PIN sent' })
  async forgotPin(@Body() forgotPinDto: ForgotPinDto) {
    return this.authService.forgotPin(forgotPinDto.identifier);
  }

  // 5. CHANGE PIN (Authenticated)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('change-pin')
  @ApiOperation({ summary: 'Change current PIN (requires old PIN)' })
  @ApiBody({ type: ChangePinDto })
  @ApiResponse({ status: 200, description: 'PIN changed successfully' })
  @ApiResponse({ status: 401, description: 'Invalid old PIN' })
  async changePin(@Req() req, @Body() changePinDto: ChangePinDto) {
    return this.authService.changePin(req.user.userId, changePinDto);
  }
}

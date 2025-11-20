// import { Injectable } from '@nestjs/common';
// import { UserService } from '../user/user.service';
// import { AddressService } from '../address/address.service';
// import { JwtService } from '@nestjs/jwt';
// import { CreateUserDto } from '../user/dto/create-user.dto';
// import * as bcrypt from 'bcrypt';
// import { Types } from 'mongoose';

// @Injectable()
// export class AuthService {
//   constructor(
//     private userService: UserService,
//     private addressService: AddressService,
//     private jwtService: JwtService,
//   ) {}

//   async validateUser(email: string, pin: string): Promise<any> {
//     const user = await this.userService.findByEmail(email);
//     if (!user) {
//       console.log(`Login attempt: method=pin, success=false, email=${email}`);
//       return null;
//     }
//     if (await bcrypt.compare(pin, user.pin)) {
//       const { pin, ...result } = user.toObject();
//       console.log(`Login attempt: method=pin, success=true, email=${email}`);
//       return result;
//     }
//     console.log(`Login attempt: method=pin, success=false, email=${email}`);
//     return null;
//   }

//   async login(user: any) {
//     const payload = { userId: user._id.toString(), sub: user._id.toString() };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }

//   async validateBiometricUser(): Promise<any> {
//     const user = await this.userService.findBiometricEnrolled();
//     if (!user) {
//       console.log(`Login attempt: method=biometric, success=false`);
//       return null;
//     }
//     console.log(`Login attempt: method=biometric, success=true, userId=${user._id}`);
//     return user.toObject();
//   }

//   async signup(createUserDto: CreateUserDto) {
//     const { street, city, state, zip } = createUserDto;
//     const user = await this.userService.create(createUserDto);
//     const newAddress = `${street}, ${city}, ${state} ${zip}`;
//     await this.addressService.update(user._id.toString(), newAddress);
//     return { userId: user._id.toString(), message: 'User created. Please log in.' };
//   }
// }
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AddressService } from '../address/address.service';
import { EmailService } from '../common/services/email.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ChangePinDto } from './dto/change-pin.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  // async validateUser(email: string, pin: string): Promise<any> {
  //   const user = await this.userService.findByEmail(email);
  //   if (!user) {
  //     console.log(`Login attempt: method=pin, success=false, email=${email}`);
  //     return null;
  //   }
  //   if (await bcrypt.compare(pin, user.pin)) {
  //     const { pin, ...result } = user.toObject();
  //     console.log(`Login attempt: method=pin, success=true, email=${email}`);
  //     return result;
  //   }
  //   console.log(`Login attempt: method=pin, success=false, email=${email}`);
  //   return null;
  // }
  // src/auth/auth.service.ts

  async validateUser(identifier: string, pin: string): Promise<any> {
    // Try to find by email first
    let user = await this.userService.findByEmail(identifier);

    // If not found by email, try by custNo
    if (!user) {
      user = await this.userService.findByCustNo(identifier);
    }

    if (!user) {
      console.log(`Login failed: identifier=${identifier}, method=pin`);
      return null;
    }

    const isPinValid = await bcrypt.compare(pin, user.pin);
    if (isPinValid) {
      const { pin: _, ...result } = user.toObject();
      console.log(
        `Login success: userId=${user._id}, identifier=${identifier}`,
      );
      return result;
    }

    console.log(`Login failed: wrong PIN for identifier=${identifier}`);
    return null;
  }
  async login(user: any) {
    const payload = { userId: user._id.toString(), sub: user._id.toString() };
    console.log(user);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateBiometricUser(): Promise<any> {
    const user = await this.userService.findBiometricEnrolled();
    if (!user) {
      console.log(`Login attempt: method=biometric, success=false`);
      return null;
    }
    console.log(
      `Login attempt: method=biometric, success=true, userId=${user._id}`,
    );
    return user.toObject();
  }

  // --------------------------------------------------------------
  //  FIXED: use the new address fields (suburb → city, postcode → zip)
  // --------------------------------------------------------------
  async signup(createUserDto: CreateUserDto) {
    const { street, suburb, state, postcode } = createUserDto; // <-- NEW

    const user = await this.userService.create(createUserDto);

    // Build a readable address string for the external Address service
    const newAddress = `${street}, ${suburb}, ${state} ${postcode}`; // <-- NEW

    await this.addressService.update(user._id.toString(), newAddress);
    return {
      userId: user._id.toString(),
      message: 'User created. Please log in.',
    };
  }
  // src/auth/auth.service.ts

  async forgotPin(identifier: string): Promise<{ message: string }> {
    let user = await this.userService.findByEmail(identifier);
    if (!user) {
      user = await this.userService.findByCustNo(identifier);
    }

    if (!user || !user.email) {
      // Security: don't reveal if user exists
      return {
        message: 'If account exists, a new PIN has been sent to your email.',
      };
    }

    // Generate new 6-digit PIN
    const newPin = Math.floor(1000 + Math.random() * 9000).toString();
    const hashedPin = await bcrypt.hash(newPin, 12);

    await this.userService.update(user._id.toString(), {
      pin: hashedPin,
    } as any);

    await this.emailService.sendPinResetEmail(user.email, newPin);

    console.log(`PIN reset for user: ${user.email} / ${user.custNo}`);
    return { message: 'New PIN sent to your email.' };
  }

  async changePin(
    userId: string,
    dto: ChangePinDto,
  ): Promise<{ message: string }> {
    const user = await this.userService.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');

    const isOldPinValid = await bcrypt.compare(dto.oldPin, user.pin);
    if (!isOldPinValid) {
      throw new UnauthorizedException('Current PIN is incorrect');
    }

    const hashedNewPin = await bcrypt.hash(dto.newPin, 10);
    await this.userService.update(userId, { pin: hashedNewPin } as any);

    // Optional: send confirmation email
    // if (user.email) {
    //   await this.emailService.sendPinChangedEmail(user.email);
    // }

    return { message: 'PIN changed successfully' };
  }
}

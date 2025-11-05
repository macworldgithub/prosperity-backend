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
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AddressService } from '../address/address.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pin: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      console.log(`Login attempt: method=pin, success=false, email=${email}`);
      return null;
    }
    if (await bcrypt.compare(pin, user.pin)) {
      const { pin, ...result } = user.toObject();
      console.log(`Login attempt: method=pin, success=true, email=${email}`);
      return result;
    }
    console.log(`Login attempt: method=pin, success=false, email=${email}`);
    return null;
  }

  async login(user: any) {
    const payload = { userId: user._id.toString(), sub: user._id.toString() };
    console.log(user)
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
}

// import { Strategy } from 'passport-local';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { AuthService } from './auth.service';

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private authService: AuthService) {
//     super({ usernameField: 'email', passwordField: 'pin' });
//   }

//   async validate(email: string, pin: string): Promise<any> {
//     const user = await this.authService.validateUser(email, pin);
//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return user;
//   }
// }
// src/auth/local.strategy.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'identifier', // ← changed from 'email'
      passwordField: 'pin',
    });
  }

  async validate(identifier: string, pin: string): Promise<any> {
    const user = await this.authService.validateUser(identifier, pin);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}

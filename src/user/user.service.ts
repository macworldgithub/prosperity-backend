// // import { Injectable } from '@nestjs/common';
// // import { InjectModel } from '@nestjs/mongoose';
// // import { Model } from 'mongoose';
// // import { User } from '../schemas/user.schema';
// // import { CreateUserDto } from './dto/create-user.dto';
// // import { UpdateUserDto } from './dto/update-user.dto';
// // import * as bcrypt from 'bcrypt';
// // import { Types } from 'mongoose';

// // @Injectable()
// // export class UserService {
// //   constructor(
// //     @InjectModel('User') private userModel: Model<User>,
// //   ) {}

// //   async create(createUserDto: CreateUserDto): Promise<User> {
// //     const salt = await bcrypt.genSalt();
// //     const hashedPin = await bcrypt.hash(createUserDto.pin, salt);

// //     const user = new this.userModel({
// //       ...createUserDto,
// //       pin: hashedPin,
// //     });

// //     return user.save();
// //   }

// //   async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
// //     if (!Types.ObjectId.isValid(id)) return null;
// //     return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
// //   }

// //   async findByEmail(email: string): Promise<User | null> {
// //     return this.userModel.findOne({ email }).populate('billId');
// //   }
// //   async findById(id: string): Promise<User | null> {
// //     if (!Types.ObjectId.isValid(id)) return null;
// //     return this.userModel.findById(id).populate('billId');
// //   }

// //   async findBiometricEnrolled(): Promise<User | null> {
// //     return this.userModel.findOne({ biometricEnrolled: true }).populate('billId');
// //   }
// // }
// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { User } from '../schemas/user.schema';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import * as bcrypt from 'bcrypt';
// import { Types } from 'mongoose';

// @Injectable()
// export class UserService {
//   constructor(@InjectModel('User') private userModel: Model<User>) {}

//   async create(createUserDto: CreateUserDto): Promise<User> {
//     const salt = await bcrypt.genSalt();
//     const hashedPin = await bcrypt.hash(createUserDto.pin, salt);

//     const user = new this.userModel({
//       ...createUserDto,
//       pin: hashedPin,
//     });

//     return user.save();
//   }

//   async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
//     if (!Types.ObjectId.isValid(id)) return null;
//     return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
//   }

//   async findByEmail(email: string): Promise<User | null> {
//     return this.userModel.findOne({ email }).populate('billId');
//   }
//   async findById(id: string): Promise<User | null> {
//     if (!Types.ObjectId.isValid(id)) return null;
//     return this.userModel.findById(id).populate('billId');
//   }

//   async findBiometricEnrolled(): Promise<User | null> {
//     return this.userModel
//       .findOne({ biometricEnrolled: true })
//       .populate('billId');
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPin = await bcrypt.hash(createUserDto.pin, salt);

    const user = new this.userModel({
      ...createUserDto,
      pin: hashedPin,
    });

    return user.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).populate('billId');
  }

  async findById(id: string): Promise<User | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.userModel.findById(id).populate('billId');
  }

  async findBiometricEnrolled(): Promise<User | null> {
    return this.userModel
      .findOne({ biometricEnrolled: true })
      .populate('billId');
  }
}

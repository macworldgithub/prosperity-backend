import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address } from '../schemas/address.schema';
import { Types } from 'mongoose';

@Injectable()
export class AddressService {
  constructor(@InjectModel('Address') private addressModel: Model<Address>) {}

  async update(userId: string, serviceAddress: string): Promise<Address> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid userId');
    }
    return this.addressModel.findOneAndUpdate(
      { userId },
      { serviceAddress },
      { upsert: true, new: true },
    );
  }

  async findByUserId(userId: string): Promise<Address | null> {
    if (!Types.ObjectId.isValid(userId)) {
      return null;
    }
    return this.addressModel.findOne({ userId });
  }
}
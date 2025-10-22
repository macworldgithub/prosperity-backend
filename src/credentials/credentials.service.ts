import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Credential } from '../schemas/credential.schema';

@Injectable()
export class CredentialsService {
  constructor(
    @InjectModel('Credential') private credentialModel: Model<Credential>,
  ) {}

  async getPassword(username: string): Promise<string | null> {
    const cred = await this.credentialModel
      .findOne({ username })
      .sort({ createdAt: -1 });
    return cred ? cred.password : null;
  }

  async updatePassword(
    username: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const latest = await this.getPassword(username);
    if (!latest) {
      throw new Error('Username not found.');
    }
    if (latest !== currentPassword) {
      throw new Error('Current password does not match.');
    }
    await this.credentialModel.create({ username, password: newPassword });
  }
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Credential extends Document {
  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;
}

export const CredentialSchema = SchemaFactory.createForClass(Credential);

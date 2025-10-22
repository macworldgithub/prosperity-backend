import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true })
export class OTP extends Document {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Customer' })
  customerId: Types.ObjectId;

  @Prop()
  transactionId: string;

  @Prop()
  code: string;

  @Prop()
  destination: string;

  @Prop({ enum: ['SMS', 'Email'] })
  method: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ expires: 300 }) // 5 minutes
  expiresAt: Date;
}

export const OTPSchema = SchemaFactory.createForClass(OTP);

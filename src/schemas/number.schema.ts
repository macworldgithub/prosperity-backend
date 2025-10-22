import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PhoneNumber extends Document {
  @Prop()
  number: string;

  @Prop()
  reservationId: string;

  @Prop()
  status: string;

  @Prop({ type: Date })
  reservedAt: Date;

  @Prop()
  custNo?: string;
}

export const PhoneNumberSchema = SchemaFactory.createForClass(PhoneNumber);

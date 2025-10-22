import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Customer extends Document {
  @Prop({ unique: true })
  custNo: string;

  @Prop()
  address: string;

  @Prop()
  postcode: string;

  @Prop()
  state: string;

  @Prop()
  suburb: string;

  @Prop()
  custType: string;

  @Prop()
  email: string;

  @Prop()
  dob: string;

  @Prop()
  firstName: string;

  @Prop()
  surname: string;

  @Prop()
  phone: string;

  @Prop()
  notes: string;

  @Prop()
  preferredContactMethod: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

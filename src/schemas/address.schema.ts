import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema()
export class Address extends Document {
  declare _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, unique: true })
  userId: Types.ObjectId;

  @Prop()
  serviceAddress: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
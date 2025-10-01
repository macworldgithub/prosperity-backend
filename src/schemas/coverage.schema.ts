import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Coverage extends Document {
  declare _id: Types.ObjectId;

  @Prop({ unique: true })
  zip: string;

  @Prop()
  displayAddress: string;

  @Prop()
  availability: string;

  @Prop([String])
  networkTypes: string[];

  @Prop()
  maxSpeed: string;

  @Prop()
  expansionDate: string;
}

export const CoverageSchema = SchemaFactory.createForClass(Coverage);
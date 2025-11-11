import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Coverage extends Document {
  declare _id: Types.ObjectId;

  // removed unique: true so multiple documents can share the same zip
  @Prop()
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

// performance: non-unique index on zip
CoverageSchema.index({ zip: 1 });

// src/plan/schemas/plan.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Plan extends Document {
  @Prop({ required: true, unique: true })
  planNo: number;

  @Prop({ required: true })
  planName: string;

  @Prop({ required: true })
  usageType: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  groupNo: string;

  @Prop()
  groupName: string;

  @Prop({ enum: ['4G', '5G'] })
  network: '4G' | '5G';
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
PlanSchema.index({ planNo: 1 }, { unique: true });

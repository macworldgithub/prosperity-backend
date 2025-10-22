import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Order extends Document {
  @Prop()
  orderId: string;

  @Prop()
  custNo: string;

  @Prop()
  status: string;

  @Prop()
  createdAt: Date;

  @Prop()
  msn: string;

  @Prop()
  planNo: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

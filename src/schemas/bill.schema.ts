import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema()
export class BillItem {
  @Prop()
  label: string;

  @Prop()
  amount: number;

  @Prop()
  highlight?: boolean;
}

@Schema()
export class InternationalCall {
  @Prop()
  count: number;

  @Prop()
  destination: string;

  @Prop()
  totalAmount: number;
}

@Schema()
export class LateFee {
  @Prop()
  amount: number;

  @Prop()
  appliedDate: string;
}

@Schema()
export class Payment {
  @Prop()
  amount: number;

  @Prop()
  paymentDate: string;
}

@Schema()
export class Bill extends Document {
  declare _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, unique: true })
  userId: Types.ObjectId;

  @Prop()
  month: string;

  @Prop([BillItem])
  items: BillItem[];

  @Prop()
  dueDate: string;

  @Prop()
  billCycleEnd: string;

  @Prop()
  disputeNotice: boolean;

  @Prop({ type: InternationalCall })
  internationalCalls?: InternationalCall;

  @Prop({ type: LateFee })
  lateFee?: LateFee;

  @Prop({ type: Payment })
  payment?: Payment;
}

export const BillSchema = SchemaFactory.createForClass(Bill);

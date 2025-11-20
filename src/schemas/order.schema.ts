// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// @Schema()
// export class Order extends Document {
//   @Prop()
//   orderId: string;

//   @Prop()
//   custNo: string;

//   @Prop()
//   status: string;

//   @Prop()
//   createdAt: Date;

//   @Prop()
//   msn: string;

//   @Prop()
//   planNo: string;
// }

// export const OrderSchema = SchemaFactory.createForClass(Order);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
  // Core identifiers
  @Prop({ required: true, unique: true })
  orderId: string;

  @Prop({ required: true })
  custNo: string;

  @Prop({ required: true })
  msn: string;

  @Prop({ required: true })
  planNo: string;

  @Prop()
  agentId?: string;

  // Status & error
  @Prop({ required: true, default: 'PENDING' })
  status: string;

  @Prop()
  errorMessage?: string;

  // Order classification
  @Prop({ required: true })
  orderType: string; // e.g., NEW_ACTIVATION, PORT_IN, PLAN_CHANGE

  @Prop({ required: true })
  orderAction: string; // e.g., ADD_WME_NEW, ADD_WME_PORT, CHANGE_WME_PLAN

  // SIM / eSIM details
  @Prop()
  simNo?: string;

  @Prop()
  isEsim?: boolean;

  @Prop()
  isQRcode?: boolean;

  // Port-specific
  @Prop()
  numType?: string; // prepaid or postpaid

  @Prop()
  dob?: string;

  @Prop()
  arn?: string;

  // Plan change specific
  @Prop()
  lineSeqNo?: string;

  @Prop()
  custReqDate?: string;

  // Customer address & contact (denormalized)
  @Prop()
  address?: string;

  @Prop()
  suburb?: string;

  @Prop()
  postcode?: string;

  @Prop()
  email?: string;

  // Full raw data for audit & debugging
  @Prop({ type: Object })
  rawRequest?: any;

  @Prop({ type: Object })
  rawResponse?: any;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

// NO INDEXES ADDED — as requested

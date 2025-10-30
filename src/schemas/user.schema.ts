// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, SchemaTypes, Types } from 'mongoose';

// @Schema()
// export class User extends Document {
//   declare _id: Types.ObjectId;

//   @Prop()
//   name: string;

//   @Prop()
//   plan: string;

//   @Prop()
//   speed: string;

//   @Prop()
//   status: string;

//   @Prop()
//   expiry: string;

//   @Prop()
//   dataUsed: number;

//   @Prop()
//   dataLimit: number;

//   @Prop()
//   biometricEnrolled: boolean;

//   @Prop({ type: SchemaTypes.ObjectId, ref: 'Bill' })
//   billId: Types.ObjectId;

//   @Prop()
//   image: string;

//   @Prop()
//   pin: string;

//   @Prop()
//   email: string;
// }

// export const UserSchema = SchemaFactory.createForClass(User);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema()
export class User extends Document {
  declare _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  plan: string;

  @Prop()
  speed: string;

  @Prop()
  status: string;

  @Prop()
  expiry: string;

  @Prop()
  dataUsed: number;

  @Prop()
  dataLimit: number;

  @Prop()
  biometricEnrolled: boolean;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Bill' })
  billId: Types.ObjectId;

  @Prop()
  image: string;

  @Prop()
  pin: string;

  @Prop()
  email: string;

  @Prop()
  custNo: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

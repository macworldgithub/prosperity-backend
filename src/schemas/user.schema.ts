// // // import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// // // import { Document, SchemaTypes, Types } from 'mongoose';

// // // @Schema()
// // // export class User extends Document {
// // //   declare _id: Types.ObjectId;

// // //   @Prop()
// // //   name: string;

// // //   @Prop()
// // //   plan: string;

// // //   @Prop()
// // //   speed: string;

// // //   @Prop()
// // //   status: string;

// // //   @Prop()
// // //   expiry: string;

// // //   @Prop()
// // //   dataUsed: number;

// // //   @Prop()
// // //   dataLimit: number;

// // //   @Prop()
// // //   biometricEnrolled: boolean;

// // //   @Prop({ type: SchemaTypes.ObjectId, ref: 'Bill' })
// // //   billId: Types.ObjectId;

// // //   @Prop()
// // //   image: string;

// // //   @Prop()
// // //   pin: string;

// // //   @Prop()
// // //   email: string;
// // // }

// // // export const UserSchema = SchemaFactory.createForClass(User);
// // import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// // import { Document, SchemaTypes, Types } from 'mongoose';

// // @Schema()
// // export class User extends Document {
// //   declare _id: Types.ObjectId;

// //   @Prop()
// //   name: string;

// //   @Prop()
// //   plan: string;

// //   @Prop()
// //   speed: string;

// //   @Prop()
// //   status: string;

// //   @Prop()
// //   expiry: string;

// //   @Prop()
// //   dataUsed: number;

// //   @Prop()
// //   dataLimit: number;

// //   @Prop()
// //   biometricEnrolled: boolean;

// //   @Prop({ type: SchemaTypes.ObjectId, ref: 'Bill' })
// //   billId: Types.ObjectId;

// //   @Prop()
// //   image: string;

// //   @Prop()
// //   pin: string;

// //   @Prop()
// //   email: string;

// //   @Prop()
// //   custNo: string;
// // }

// // export const UserSchema = SchemaFactory.createForClass(User);

// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, SchemaTypes, Types } from 'mongoose';

// @Schema({ timestamps: true })
// export class User extends Document {
//   declare _id: Types.ObjectId;

//   @Prop({ required: true })
//   name: string;

//   @Prop({ required: true, unique: true })
//   email: string;

//   @Prop({ required: true })
//   pin: string; // hashed

//   // Address fields
//   @Prop({ required: true })
//   street: string;

//   @Prop({ required: true })
//   city: string;

//   @Prop({ required: true })
//   state: string;

//   @Prop({ required: true })
//   zip: string;

//   @Prop({ default: false })
//   biometricEnrolled: boolean;

//   @Prop({ type: SchemaTypes.ObjectId, ref: 'Bill' })
//   billId?: Types.ObjectId;

//   @Prop()
//   image?: string;

//   @Prop()
//   custNo?: string;

//   @Prop()
//   plan?: string;

//   @Prop()
//   speed?: string;

//   @Prop()
//   status?: string;

//   @Prop()
//   expiry?: string;

//   @Prop()
//   dataUsed?: number;

//   @Prop()
//   dataLimit?: number;
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

  // === ADDRESS FIELDS (from Customer) ===
  @Prop()
  street?: string;

  @Prop()
  suburb?: string;

  @Prop()
  state?: string;

  @Prop()
  postcode?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

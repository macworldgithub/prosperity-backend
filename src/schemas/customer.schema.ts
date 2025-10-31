// // // import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// // // import { Document } from 'mongoose';

// // // @Schema({ timestamps: true })
// // // export class Customer extends Document {
// // //   @Prop({ unique: true })
// // //   custNo: string;

// // //   @Prop()
// // //   address: string;

// // //   @Prop()
// // //   postcode: string;

// // //   @Prop()
// // //   state: string;

// // //   @Prop()
// // //   suburb: string;

// // //   @Prop()
// // //   custType: string;

// // //   @Prop()
// // //   email: string;

// // //   @Prop()
// // //   dob: string;

// // //   @Prop()
// // //   firstName: string;

// // //   @Prop()
// // //   surname: string;

// // //   @Prop()
// // //   phone: string;

// // //   @Prop()
// // //   notes: string;

// // //   @Prop()
// // //   preferredContactMethod: string;
// // // }

// // // export const CustomerSchema = SchemaFactory.createForClass(Customer);
// // import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// // import { Document } from 'mongoose';

// // @Schema({ timestamps: true })
// // export class Customer extends Document {
// //   @Prop({ unique: true })
// //   custNo: string;

// //   @Prop()
// //   address: string;

// //   @Prop()
// //   postcode: string;

// //   @Prop()
// //   state: string;

// //   @Prop()
// //   suburb: string;

// //   @Prop()
// //   custType: string;

// //   @Prop()
// //   email: string;

// //   @Prop()
// //   dob: string;

// //   @Prop()
// //   dob_port?: string;

// //   @Prop()
// //   firstName: string;

// //   @Prop()
// //   surname: string;

// //   @Prop()
// //   phone: string;

// //   @Prop()
// //   notes?: string;

// //   @Prop()
// //   preferredContactMethod: string;

// //   // New fields
// //   @Prop()
// //   sal?: string;

// //   @Prop()
// //   orderNotificationEmail?: string;

// //   @Prop()
// //   custAuthorityType?: string;

// //   @Prop()
// //   custAuthorityNo?: string;
// // }

// // export const CustomerSchema = SchemaFactory.createForClass(Customer);

// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// @Schema({ timestamps: true })
// export class Customer extends Document {
//   @Prop({ unique: true })
//   custNo: string;

//   @Prop()
//   address: string;

//   @Prop()
//   postcode: string;

//   @Prop()
//   state: string;

//   @Prop()
//   suburb: string;

//   @Prop()
//   custType: string;

//   @Prop()
//   email: string;

//   @Prop()
//   dob: string;

//   @Prop()
//   dob_port?: string;

//   @Prop()
//   firstName: string;

//   @Prop()
//   surname: string;

//   @Prop()
//   phone: string;

//   @Prop()
//   notes?: string;

//   @Prop()
//   preferredContactMethod: string;

//   // New fields
//   @Prop()
//   sal?: string;

//   @Prop()
//   orderNotificationEmail?: string;

//   @Prop()
//   custAuthorityType?: string;

//   @Prop()
//   custAuthorityNo?: string;
// }
// export const CustomerSchema = SchemaFactory.createForClass(Customer);

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
  dob_port?: string;

  @Prop()
  firstName: string;

  @Prop()
  surname: string;

  @Prop()
  phone: string;

  @Prop()
  notes?: string;

  @Prop()
  preferredContactMethod: string;

  // New fields
  @Prop()
  sal?: string;

  @Prop()
  orderNotificationEmail?: string;

  @Prop()
  custAuthorityType?: string;

  @Prop()
  custAuthorityNo?: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

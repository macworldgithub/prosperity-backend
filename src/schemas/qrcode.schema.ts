import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class QRCode extends Document {
  @Prop()
  orderId: string;

  @Prop()
  msn: string;

  @Prop()
  imageData: string; // base64

  @Prop()
  createdAt: Date;
}

export const QRCodeSchema = SchemaFactory.createForClass(QRCode);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type SaleDocument = HydratedDocument<Sale>;

@Schema({ timestamps: true })
export class Sale {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
  product: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  agent: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Account', required: true })
  account: Types.ObjectId;

  /** no of items sold */
  @Prop({ required: true })
  quantity: number;

  /** total products value from the sale */
  @Prop({ required: true })
  totalAmount: number;

  /** commission made for the sale */
  @Prop({ required: true })
  commission: number;

  @Prop({ default: Date.now })
  date: Date;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);

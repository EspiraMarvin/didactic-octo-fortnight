import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;

@Schema({ timestamps: true })
export class Account {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  agent: Types.ObjectId;

  /** total commission paid to the agent */
  @Prop({ required: true })
  total_commission_paid: number;

  /** total commission pending to be paid to the agent */
  @Prop({ required: true })
  total_commission_pending: number;

  /** total products sale value */
  @Prop({ required: true })
  total_sales: number;

  /** recorded date */
  @Prop({ default: Date.now })
  date: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);

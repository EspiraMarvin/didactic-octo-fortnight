import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;

@Schema({ timestamps: true })
export class Account {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  agent: string;

  /** total commission paid to the agent */
  @Prop({ required: true })
  total_commission_paid: number;

  /** total commission pending to be paid to the agent */
  @Prop({ required: true })
  total_commission_pending: number;

  /** diff between commission pending and paid, if pending is > 0 */
  @Prop({ required: true })
  balance: number;

  /** total products sale value */
  @Prop({ required: true })
  total_sales: number;

  /** recorded date */
  @Prop({ default: Date.now })
  date: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);

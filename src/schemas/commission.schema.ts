import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type CommissionDocument = HydratedDocument<Commission>;

@Schema()
export class Commission {
  @Prop({ required: true })
  @IsNumber()
  commission: number;

  @Prop({ default: true })
  valid: boolean;

  @Prop({ default: Date.now })
  created_date: Date;
}

export const CommissionSchema = SchemaFactory.createForClass(Commission);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type CommissionDocument = HydratedDocument<Commission>;

@Schema({ timestamps: true })
export class Commission {
  @Prop({ required: true })
  @IsNumber()
  commission: number;
}

export const CommissionSchema = SchemaFactory.createForClass(Commission);

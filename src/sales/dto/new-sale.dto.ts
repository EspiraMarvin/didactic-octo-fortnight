import { IsNumber, IsString } from 'class-validator';

export class NewSaleDto {
  @IsString()
  product: string;

  @IsNumber()
  quantity: number;
}

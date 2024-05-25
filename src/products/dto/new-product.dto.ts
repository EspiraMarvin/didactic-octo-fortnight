import { IsNumber, IsString } from 'class-validator';

export class NewProductDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsNumber()
  price: number;
}

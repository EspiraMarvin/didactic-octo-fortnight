import { IsEmail, MinLength, IsString, IsNotEmpty } from 'class-validator';

export class SignUpAgentDto {
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @MinLength(6)
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;
}

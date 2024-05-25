import { IsEmail, MinLength, IsString } from 'class-validator';

export class RegisterNewAgentDto {
  @IsString()
  @MinLength(5)
  name?: string;

  @IsEmail()
  @MinLength(6)
  email: string;

  @MinLength(6)
  password: string;
}

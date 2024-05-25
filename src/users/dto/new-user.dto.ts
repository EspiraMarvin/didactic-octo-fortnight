import { MinLength, IsEnum, IsEmail } from 'class-validator';
// import { UserRole } from '../user-role.enum';

export enum UserRole {
  ADMIN = 'admin',
  AGENT = 'agent',
}

export class NewUserDto {
  @MinLength(5)
  name: string;

  @MinLength(5)
  @IsEmail()
  email: string;

  @MinLength(5)
  password: string;

  @IsEnum(UserRole, {
    message: 'Role must be one of the following values: admin, agent',
  })
  role: UserRole;
}

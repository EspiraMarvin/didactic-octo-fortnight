import { PartialType } from '@nestjs/mapped-types';
import { NewUserDto } from './index';

export class UpdateUserDto extends PartialType(NewUserDto) {}

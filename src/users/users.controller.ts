import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { NewUserDto, UpdateUserDto } from './dto';
import { AuthGuard, AdminGuard } from 'src/auth/guards';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  /** get all users */
  @UseGuards(AdminGuard)
  @Get()
  getUsers() {
    try {
      return this.service.getUsers();
    } catch (err) {
      throw new Error(err);
    }
  }

  /** get user by id*/
  @UseGuards(AuthGuard)
  @Get(':id')
  getUser(@Param('id') userId: string) {
    try {
      return this.service.getUser(userId);
    } catch (err) {
      throw new Error(err);
    }
  }

  /** update user */
  @Patch(':id')
  updateUser(
    @Param('id') userId: string,
    @Body(new ValidationPipe()) body: UpdateUserDto,
  ) {
    try {
      return this.service.updateUser(userId, body);
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * delete user
   */
  @Delete(':id')
  deleteUser(@Param('id') userId: string) {
    try {
      return this.service.deleteUser(userId);
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * create a new user
   */
  @Post()
  createUser(@Body(new ValidationPipe()) body: NewUserDto) {
    try {
      return this.service.createUser(body);
    } catch (err) {
      throw new Error(err);
    }
  }
}

import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { deletePwdFromResponse } from 'src/utils/helpers';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcryptjs';
import { NewUserDto } from './dto/new-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /**
   * get all users
   * @returns users
   */
  async getUsers() {
    const users = await this.userModel.find({});

    if (users.length === 0) throw new NotFoundException('users not found');

    return users.map((user) => deletePwdFromResponse(user));
  }

  /**
   * get a single user
   * @returns user
   */
  async getUser(userId: string) {
    const user = await this.userModel.findById(userId).lean();

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    this.logger.log(`User found ${user}`);

    return deletePwdFromResponse(user);
  }

  /**
   * updates user
   * @param userId
   * @param body
   * @returns
   */
  async updateUser(userId: string, body: UpdateUserDto) {
    const user = await this.userModel.findById(userId).lean();

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (body.email === 'admin@incourage.com' || body.name === 'admin') {
      const email = body.email === 'admin@incourage.com';
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `The ${email ? 'email' : 'name'} ${email ? body.email : body.name} is not allowed, use other options`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user.email === body.email) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `User with ${body.email} already exists`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (body.password) {
      const hashedPassword = await hash(body.password, 10);
      body.password = hashedPassword;
    }

    const updateUser = await this.userModel.findByIdAndUpdate(userId, body, {
      new: true,
    });

    this.logger.log(`User updated ${user}`);

    return deletePwdFromResponse(updateUser);
  }

  /**
   * deletes user
   * @param userId
   * @returns
   */
  async deleteUser(userId: string) {
    const user = await this.userModel.findById(userId).lean();
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (user.email === 'admin@incourage.com') {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Operation not allowed',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const deleteUser = await this.userModel.findByIdAndDelete(userId);
    this.logger.log(`User deleted ${user}`);

    return deletePwdFromResponse(deleteUser);
  }

  async createUser(body: NewUserDto) {
    const userExists = await this.userModel.findOne({
      email: body.email,
    });

    if (userExists) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `User with ${body.email} email already exists`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (body.name === 'admin') {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `The name ${body.name} is not allowed, use other options`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const password = await hash(body.password.toString(), 10);
    body.password = password;

    let newUser = new this.userModel(body);
    newUser = await newUser.save();

    return deletePwdFromResponse(newUser);
  }
}

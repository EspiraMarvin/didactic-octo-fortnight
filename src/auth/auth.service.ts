import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { compare, hash } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { SignUpAgentDto } from './dto';
import { deletePwdFromResponse } from 'src/utils/helpers';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  /**
   * sigIn user
   * @param email
   * @param password
   * @returns
   */
  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException();
    }

    // compare password
    const pwdMatches = await compare(
      password ? password.toString() : '',
      user.password,
    );

    if (!pwdMatches) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    return this.signToken(user._id.toString(), user.email);
  }

  /**
   * sign token
   * @param id
   * @param email
   * @returns access_token
   */
  async signToken(
    id: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: id, email };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwtService.signAsync(payload, {
      secret: secret,
      expiresIn: '15m',
    });

    return {
      access_token: token,
    };
  }

  async signUpAgent(body: SignUpAgentDto): Promise<any> {
    // check if user credentials are for the admin / our seeded admin credentials
    if (body.name === 'admin')
      throw new ForbiddenException(
        'Credentials Not Allowed, Please Try Other Credentials',
      );

    // check if user exists
    const exists = await this.userModel.findOne({
      name: body.name,
      email: body.email,
    });

    if (exists)
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `User already exists`,
        },
        HttpStatus.BAD_REQUEST,
      );

    // hash password
    const password = await hash(body.password.toString(), 10);
    body.password = password;

    /** specify role as agent */
    const newBody = { ...body, role: 'agent' };

    const newAgent = new this.userModel(newBody);
    await newAgent.save();

    return deletePwdFromResponse(newAgent);
  }
}

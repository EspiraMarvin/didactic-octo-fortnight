import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [AuthService, ConfigService],
  controllers: [AuthController],
})
export class AuthModule {}

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpAgentDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /** sign in */
  @HttpCode(HttpStatus.OK) //status code 200
  @Post('signin')
  signin(@Body() body: SignInDto) {
    try {
      return this.authService.signIn(body.email, body.password);
    } catch (err) {
      throw new Error(err);
    }
  }

  /** signup agent */
  @Post('signup-agent') //status code 201
  signUpAgent(@Body() body: SignUpAgentDto) {
    return this.authService.signUpAgent(body);
  }


  // FOR E2E TEST ONLY
  @Post('signup-admin') //status code 201
  signUpAdmin(@Body() body: SignUpAgentDto) {
    return this.authService.signUpAdmin(body);
  }
}

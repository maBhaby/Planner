import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignInDto } from 'src/app.dts';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authServide: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() singInDto: SignInDto) {
    return this.authServide.singIn(singInDto.username, singInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() singInDto: SignInDto) {
    return this.authServide.register(singInDto.username, singInDto.password);
  }
}

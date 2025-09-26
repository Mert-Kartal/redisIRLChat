import { Controller, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, VerifyCodeDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }
  @Post('verify-code')
  async verifyCode(@Body() data: VerifyCodeDto) {
    return this.authService.verifyCode(data);
  }
  @Post('login')
  async login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
  @Post('logout')
  async logout(@Headers('authorization') header: string) {
    return this.authService.logout(header);
  }
  @Post('refresh')
  async refresh(@Headers('authorization') header: string) {
    return this.authService.refresh(header);
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto, RegisterDto } from './auth.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async register(data: RegisterDto) {
    const hashedPassword = await argon2.hash(data.password);
    const user = await this.userService.add({
      ...data,
      password: hashedPassword,
    });
    return user;
  }
  async login(data: LoginDto) {
    const user = await this.userService.checkEmail(data.email);
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await argon2.verify(user.password, data.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return 'Login successful';
  }
}

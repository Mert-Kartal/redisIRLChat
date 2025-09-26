import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto, RegisterDto, VerifyCodeDto } from './auth.dto';
import * as argon2 from 'argon2';
import { JwtService } from '../jwt/jwt.service';
import { RedisService } from '../redis/redis.service';
import { EmailProducerService } from '../email/email-producer.service';
import { VERIFICATION_CODE_HTML_TEMPLATE } from '../email/verify-code';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly emailProducerService: EmailProducerService,
  ) {}
  async register(data: RegisterDto) {
    const hashedPassword = await argon2.hash(data.password);
    const code = Math.floor(100000 + Math.random() * 900000);
    const expires_in_minutes = 15; // Redis'teki süre ile uyumlu
    const current_year = new Date().getFullYear();
    const htmlContent = VERIFICATION_CODE_HTML_TEMPLATE.replace(
      '{{VERIFICATION_CODE}}',
      code.toString(),
    )
      .replace('{{EXPIRES_IN_MINUTES}}', expires_in_minutes.toString())
      .replace('{{CURRENT_YEAR}}', current_year.toString());

    try {
      const user = await this.userService.checkEmail(data.email);
      if (user) {
        throw new BadRequestException('Email already exists');
      }
      await this.redisService.getClient().hmset('user:' + data.email, {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        code,
      });
      await this.redisService.getClient().expire('user:' + data.email, 60 * 15);
      await this.emailProducerService.addEmailJob({
        to: data.email,
        subject: 'Verification Code',
        html: htmlContent,
      });
      return { message: 'Verification email sent' };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to register');
    }
  }
  async verifyCode(data: VerifyCodeDto) {
    const tempUser = await this.redisService
      .getClient()
      .hgetall('user:' + data.email);
    if (!tempUser || +tempUser.code !== data.code) {
      throw new BadRequestException('Invalid code');
    }
    const user = await this.userService.add({
      email: tempUser.email,
      name: tempUser.name,
      password: tempUser.password,
    });
    const { accessToken, refreshToken } = await this.jwtService.generateToken({
      userId: user.id,
      role: user.role,
    });
    await this.redisService.getClient().del('user:' + data.email);
    return { accessToken, refreshToken };
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
    const { accessToken, refreshToken } = await this.jwtService.generateToken({
      userId: user.id,
      role: user.role,
    });
    return { accessToken, refreshToken };
  }
  async logout(header: string) {
    return this.jwtService.logout(header);
  }
  async refresh(header: string) {
    return this.jwtService.refresh(header);
  }
}

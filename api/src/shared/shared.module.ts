import { Module } from '@nestjs/common';
import { JwtModule } from '../jwt/jwt.module';
import { JwtGuard } from './guard/jwt.guard';
@Module({
  providers: [JwtGuard],
  imports: [JwtModule],
  exports: [JwtModule, JwtGuard],
})
export class SharedModule {}

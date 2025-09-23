import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../shared/interfaces/jwt-payload';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtService {
  constructor(private readonly prisma: PrismaService) {}
  private extractToken(header: string) {
    if (!header || !header.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }
    return header.split(' ')[1];
  }
  private async revokeToken(header: string) {
    const token = this.verifyToken(
      header,
      process.env.JWT_REFRESH_SECRET as string,
    );
    const oldTokenRecord = await this.prisma.token.findUnique({
      where: { id: token.jti },
    });
    if (!oldTokenRecord || oldTokenRecord.revokedAt) {
      throw new UnauthorizedException('Invalid token');
    }
    await this.prisma.token.update({
      where: { id: token.jti },
      data: { revokedAt: new Date() },
    });
  }
  verifyToken(header: string, secret: string) {
    const token = this.extractToken(header);
    try {
      const verified = jwt.verify(token, secret);
      return verified as JwtPayload;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid token');
    }
  }
  async generateToken(payload: JwtPayload) {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET as string,
      {
        expiresIn: '1h',
      },
    );
    const refreshTokenRecord = await this.prisma.token.create({
      data: {
        userId: payload.userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
    const refreshToken = jwt.sign(
      { ...payload, jti: refreshTokenRecord.id },
      process.env.JWT_REFRESH_SECRET as string,
      {
        expiresIn: '7d',
      },
    );
    return { accessToken, refreshToken };
  }
  async logout(header: string) {
    await this.revokeToken(header);
    return 'Logout successful';
  }
  async refresh(header: string) {
    const token = this.verifyToken(
      header,
      process.env.JWT_REFRESH_SECRET as string,
    );
    await this.revokeToken(header);
    return this.generateToken({ userId: token.userId, role: token.role });
  }
}

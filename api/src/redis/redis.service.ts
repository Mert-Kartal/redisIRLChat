import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;

  constructor(private readonly configService: ConfigService) {
    this.client = new Redis({
      host: this.configService.get('REDIS_HOST') || '127.0.0.1',
      port: parseInt(this.configService.get('REDIS_PORT') || '6379', 10),
    });
  }

  onModuleInit() {
    this.client.on('connect', () => {
      console.log('Redis connected');
    });

    this.client.on('error', (err) => {
      console.error('Redis connection error:', err);
    });
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  getClient(): Redis {
    return this.client;
  }
}

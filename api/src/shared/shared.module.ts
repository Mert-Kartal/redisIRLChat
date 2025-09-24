import { Module } from '@nestjs/common';
import { EmailService } from './service/email/email.service';

@Module({
  providers: [EmailService],
})
export class SharedModule {}

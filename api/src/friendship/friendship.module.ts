import { Module } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { FriendshipController } from './friendship.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { FriendshipRepository } from './friendship.repository';
import { UserModule } from '../user/user.module';
import { EmailModule } from '../email/email.module';
import { SharedModule } from '../shared/shared.module';
@Module({
  imports: [PrismaModule, UserModule, EmailModule, SharedModule],
  providers: [FriendshipService, FriendshipRepository],
  controllers: [FriendshipController],
})
export class FriendshipModule {}

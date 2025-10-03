import { BadRequestException, Injectable } from '@nestjs/common';
import { FriendshipRepository } from './friendship.repository';
import { UserService } from '../user/user.service';
import { EmailProducerService } from '../email/email-producer.service';
import { FRIEND_REQUEST_HTML_TEMPLATE } from './friend-request';
import { FriendshipStatus } from '@prisma/client';
import { FriendshipDto } from './friendship.dto';

@Injectable()
export class FriendshipService {
  constructor(
    private readonly friendshipRepository: FriendshipRepository,
    private readonly userService: UserService,
    private readonly emailProducerService: EmailProducerService,
  ) {}
  async add(data: FriendshipDto) {
    const { requesterId, receiverId } = data;
    if (requesterId === receiverId) {
      throw new BadRequestException(
        'You cannot send friend request to yourself',
      );
    }

    const checkFriendship = await this.friendshipRepository.show({
      requesterId,
      receiverId,
    });
    if (checkFriendship) {
      throw new BadRequestException('Friendship already exists');
    }

    const requester = await this.userService.show(requesterId);
    const receiver = await this.userService.show(receiverId);
    if (!requester || !receiver) {
      throw new BadRequestException('User not found');
    }
    await this.friendshipRepository.create({ requesterId, receiverId });

    const current_year = new Date().getFullYear();
    const htmlContent = FRIEND_REQUEST_HTML_TEMPLATE.replace(
      '{{REQUESTER_EMAIL}}',
      requester.email,
    ).replace('{{CURRENT_YEAR}}', current_year.toString());

    await this.emailProducerService.addEmailJob({
      to: receiver.email,
      subject: 'Friendship Request',
      html: htmlContent,
    });
    return 'Friendship request sent';
  }
  async listIncomingRequests(userId: string) {
    return await this.friendshipRepository.getIncomingRequests(userId);
  }
  async listOutgoingRequests(userId: string) {
    return await this.friendshipRepository.getOutgoingRequests(userId);
  }
  async listFriends(userId: string) {
    return await this.friendshipRepository.index(userId);
  }
  async acceptRequest(data: FriendshipDto) {
    const { requesterId, receiverId } = data;
    console.log(requesterId, receiverId);
    const checkFriendship = await this.friendshipRepository.show({
      requesterId,
      receiverId,
    });
    if (!checkFriendship || checkFriendship.receiverId !== receiverId) {
      throw new BadRequestException('Request not found');
    }
    if (checkFriendship.status !== FriendshipStatus.PENDING) {
      throw new BadRequestException('Request not pending');
    }
    await this.friendshipRepository.acceptRequest({ requesterId, receiverId });
    return 'Friendship accepted';
  }
  async remove(user1Id: string, user2Id: string) {
    const friendship = await this.friendshipRepository.show({
      requesterId: user1Id,
      receiverId: user2Id,
    });

    if (!friendship) {
      throw new BadRequestException('Request not found');
    }

    await this.friendshipRepository.delete({
      requesterId: user1Id,
      receiverId: user2Id,
    });
    return { message: 'Friendship removed' };
  }
}

import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { JwtGuard } from '../shared/guard/jwt.guard';
import type { Request } from 'express';

@UseGuards(JwtGuard)
@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}
  @Post(':receiverId')
  async add(
    @Param('receiverId', ParseUUIDPipe) receiverId: string,
    @Req() req: Request,
  ) {
    return this.friendshipService.add({
      requesterId: req.user.userId,
      receiverId,
    });
  }
  @Get()
  async getFriendships(@Req() req: Request) {
    return this.friendshipService.listFriends(req.user.userId);
  }
  @Get('requests/incoming')
  async getIncomingRequests(@Req() req: Request) {
    return this.friendshipService.listIncomingRequests(req.user.userId);
  }
  @Get('requests/outgoing')
  async getOutgoingRequests(@Req() req: Request) {
    return this.friendshipService.listOutgoingRequests(req.user.userId);
  }
  @Patch('requests/:userId/accept')
  async acceptRequest(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Req() req: Request,
  ) {
    return this.friendshipService.acceptRequest({
      requesterId: userId,
      receiverId: req.user.userId,
    });
  }
  @Delete(':userId')
  async remove(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Req() req: Request,
  ) {
    return this.friendshipService.remove(req.user.userId, userId);
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FriendshipStatus } from '@prisma/client';
import { FriendshipDto } from './friendship.dto';

@Injectable()
export class FriendshipRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: FriendshipDto) {
    return this.prisma.friendship.create({
      data,
    });
  }
  async show(data: FriendshipDto) {
    return this.prisma.friendship.findFirst({
      where: {
        OR: [
          { requesterId: data.requesterId, receiverId: data.receiverId },
          { requesterId: data.receiverId, receiverId: data.requesterId },
        ],
      },
    });
  }
  async getIncomingRequests(receiverId: string) {
    return this.prisma.friendship.findMany({
      where: { receiverId, status: FriendshipStatus.PENDING },
      include: {
        Requester: {
          select: {
            id: true,
            name: true,
            email: true,
            photo: true,
            status: true,
          },
        },
      },
    });
  }
  async getOutgoingRequests(requesterId: string) {
    return this.prisma.friendship.findMany({
      where: { requesterId, status: FriendshipStatus.PENDING },
      include: {
        Receiver: {
          select: {
            id: true,
            name: true,
            email: true,
            photo: true,
            status: true,
          },
        },
      },
    });
  }
  async index(userId: string) {
    return this.prisma.friendship.findMany({
      where: {
        OR: [{ requesterId: userId }, { receiverId: userId }],
        status: FriendshipStatus.ACCEPTED,
      },
      include: {
        Requester: {
          select: {
            id: true,
            name: true,
            email: true,
            photo: true,
            status: true,
            lastActivity: true,
          },
        },
        Receiver: {
          select: {
            id: true,
            name: true,
            email: true,
            photo: true,
            status: true,
            lastActivity: true,
          },
        },
      },
    });
  }
  async acceptRequest(data: FriendshipDto) {
    return this.prisma.friendship.update({
      where: {
        requesterId_receiverId: {
          requesterId: data.requesterId,
          receiverId: data.receiverId,
        },
      },
      data: {
        status: FriendshipStatus.ACCEPTED,
      },
    });
  }
  async delete(data: FriendshipDto) {
    return this.prisma.friendship.deleteMany({
      where: {
        OR: [
          { requesterId: data.requesterId, receiverId: data.receiverId },
          { requesterId: data.receiverId, receiverId: data.requesterId },
        ],
      },
    });
  }
}

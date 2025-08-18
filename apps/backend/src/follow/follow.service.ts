import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Follow } from './entities/follow.entity';

@Injectable()
export class FollowService {
  constructor(private readonly prisma: PrismaService) {}

  async followUser(followerId: number, followingId: number): Promise<Follow> {
    if (followerId === followingId) {
      throw new Error('You cannot follow yourself');
    }

    const alreadyFollowing = await this.prisma.follow.findFirst({
      where: {
        followerId,
        followingId,
      },
    });

    if (alreadyFollowing) {
      throw new Error('You are already following this user');
    }

    return this.prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    });
  }

  async unfollowUser(followerId: number, followingId: number): Promise<void> {
    const follow = await this.prisma.follow.findFirst({
      where: {
        followerId,
        followingId,
      },
    });

    if (!follow) {
      throw new Error('You are not following this user');
    }

    this.prisma.follow.delete({
      where: {
        id: follow.id,
      },
    });
  }

  async getFollowers(userId: number): Promise<Follow[]> {
    return this.prisma.follow.findMany({
      where: {
        followingId: userId,
      },
    });
  }

  async getFollowing(userId: number): Promise<Follow[]> {
    return this.prisma.follow.findMany({
      where: {
        followerId: userId,
      },
    });
  }
}

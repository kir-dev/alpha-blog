import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) {}

  async addLike(userId: number, postId: number) {
    const existingLike = await this.prisma.like.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
    });

    if (existingLike) {
      throw new ForbiddenException('You have already liked this post');
    }

    return this.prisma.like.create({
      data: {
        userId,
        postId,
      },
    });
  }

  async removeLike(userId: number, postId: number) {
    const existingLike = await this.prisma.like.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
    });

    if (!existingLike) {
      throw new ForbiddenException('You have not liked this post');
    }

    return this.prisma.like.delete({
      where: {
        userId_postId: { userId, postId },
      },
    });
  }

  async getLikes(postId: number) {
    return this.prisma.like.findMany({
      where: { postId },
      include: { user: { select: { id: true, name: true } } },
    });
  }
}

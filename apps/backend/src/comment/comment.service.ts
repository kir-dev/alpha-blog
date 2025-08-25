import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(postId: number, createCommentDto: CreateCommentDto): Promise<Comment> {
    const { userId } = createCommentDto;

    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.comment.create({
      data: {
        text: createCommentDto.text,
        user: { connect: { id: userId } },
        post: { connect: { id: postId } },
      },
    });
  }

  async remove(id: number): Promise<Comment> {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return this.prisma.comment.delete({ where: { id } });
  }
}

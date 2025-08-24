import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { User } from 'src/user/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto, user: User) {
    return await this.prisma.post.create({
      data: {
        ...createPostDto, //egyesevel kiirja az attributumait
        authorId: user.id,
      },
    });
  }

  async findAll(): Promise<Post[]> {
    try {
      return await this.prisma.post.findMany();
    } catch (e) {
      throw new NotFoundException('Posts not found');
    }
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      return await this.prisma.post.update({
        where: { id },
        data: updatePostDto,
      });
    } catch (e) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
  }

  remove(id: number) {
    try {
      return this.prisma.post.delete({
        where: { id },
      });
    } catch (e) {
      throw new NotFoundException(`This post doesn't exist.`);
    }
  }
}

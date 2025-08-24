import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { User } from 'src/user/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto, user: User): Promise<Post> {
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
    } catch {
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

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    try {
      return await this.prisma.post.update({
        where: { id },
        data: updatePostDto,
      });
    } catch {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
  }

  remove(id: number): Promise<Post> {
    try {
      return this.prisma.post.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException(`This post doesn't exist.`);
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Post } from '../post/entities/post.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from "./entities/tag.entity";

@Injectable()
export class TagService{
  constructor(private readonly prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto) {
    return this.prisma.tag.create({ data: createTagDto });
  }

  async findAll(): Promise<Tag[]> {
    try {
      return await this.prisma.tag.findMany();
    }catch(e){
        throw new NotFoundException('Tags not found')
    }
  }

  async findPostsByTag(tagName: string): Promise<Post[]> {
    const tag = await this.prisma.tag.findUnique({
      where: { name: tagName },
      include: { posts: true },
    });
    if(!tag) {
      throw new NotFoundException(`Tag '${tagName}' not found`);
    }
    return tag.posts;
  }

}


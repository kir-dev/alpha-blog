import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { User } from 'src/user/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService){}

  async create(createPostDto: CreatePostDto, user: User) {

    return await this.prisma.post.create({
      data:{
        ...createPostDto, //egyesevel kiirja az attributumait
        authorId: user.id,
      }
    })
  }

  async findAll(): Promise<Post[]> {
    try {
      return await this.prisma.post.findMany();
    }catch(e){
        throw new NotFoundException('Posts not found')
      }
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}

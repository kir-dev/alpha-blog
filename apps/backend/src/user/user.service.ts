import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<{ users: User[] }> {
    const users = await this.prisma.user.findMany();
    return { users };
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException(`User with id ${id} not found`);
        }
      }
      throw e;
    }
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }

  async getFollowers(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['followers'],
    });
    if (!user) throw new NotFoundException('User not found');
    return user.followers;
  }

  async getFollowing(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['following'],
    });
    if (!user) throw new NotFoundException('User not found');
    return user.following;
  }

  async getPosts(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['posts'],
    });
    if (!user) throw new NotFoundException('User not found');
    return user.posts;
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Post, Prisma, User } from '@prisma/client';
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

  async findMe(authSchId: string): Promise<User> {
    if (!authSchId || typeof authSchId !== 'string') {
      throw new BadRequestException('Missing or invalid authSchId');
    }

    const user = await this.prisma.user.findUnique({
      where: { authSchId },
    });

    if (!user) {
      throw new NotFoundException(`User with authSchId ${authSchId} not found`);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
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

  async remove(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async getFollowers(id: number): Promise<User[]> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { followers: true },
    });
    if (!user) throw new NotFoundException('User not found');
    const followers: User[] = [];
    for (const follower of user.followers) {
      const followerDetails = await this.prisma.user.findUnique({
        where: { id: follower.id },
      });
      if (followerDetails) {
        followers.push(followerDetails);
      }
    }
    return followers;
  }

  async getFollowing(id: number): Promise<User[]> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { following: true },
    });
    if (!user) throw new NotFoundException('User not found');
    const following: User[] = [];
    for (const followee of user.following) {
      const followeeDetails = await this.prisma.user.findUnique({
        where: { id: followee.id },
      });
      if (followeeDetails) {
        following.push(followeeDetails);
      }
    }
    return following;
  }

  async getPosts(id: number): Promise<Post[]> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user.posts;
  }
}

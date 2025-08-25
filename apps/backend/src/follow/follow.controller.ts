import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { FollowDto } from './dto/follow.dto';
import { Follow } from './entities/follow.entity';
import { FollowService } from './follow.service';

import { AuthGuard } from '@nestjs/passport';

@Controller('users/:id')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post('follow')
  @UseGuards(AuthGuard('jwt'))
  async followUser(@Param('id', ParseIntPipe) followingId: number, @Body() followDto: FollowDto): Promise<Follow> {
    return this.followService.followUser(followDto.followerId, followingId);
  }
  @Delete('unfollow')
  @UseGuards(AuthGuard('jwt'))
  async unfollowUser(@Param('id', ParseIntPipe) followingId: number, @Body() followDto: FollowDto): Promise<void> {
    return this.followService.unfollowUser(followDto.followerId, followingId);
  }

  @Get('followers')
  async getFollowers(@Param('id', ParseIntPipe) userId: number): Promise<Follow[]> {
    return this.followService.getFollowers(userId);
  }

  @Get('following')
  async getFollowing(@Param('id', ParseIntPipe) userId: number): Promise<Follow[]> {
    return this.followService.getFollowing(userId);
  }
}

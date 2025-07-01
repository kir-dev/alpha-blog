import { Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { LikeService } from './like.service';

interface AuthenticatedRequest extends Request {
  user: {
    userId: number;
    username?: string;
  };
}

@Controller('posts/:postId')
@UseGuards(AuthGuard('jwt'))
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

 @Post('like')
  async addLike(@Param('postId') postId: number, @Req() req: AuthenticatedRequest) {
    const userId = req.user['userId'];
    return this.likeService.addLike(userId, +postId);
  }

  @Get('likes')
  async getLikes(@Param('postId') postId: number) {
    return this.likeService.getLikes(+postId);
  }

  @Delete('like')
  async removeLike(@Param('postId') postId: number, @Req() req: AuthenticatedRequest) {
    const userId = req.user['userId'];
    return this.likeService.removeLike(userId, +postId);
  }
}

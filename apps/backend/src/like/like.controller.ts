import { Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { LikeService } from './like.service';

@Controller('posts/:postId/like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async addLike(@Param('postId') postId: number, @Req() req: Request) {
    const userId = req.user.id; // Feltételezve, hogy a felhasználó azonosítója elérhető
    return this.likeService.addLike(userId, postId);
  }

  @Delete()
  async removeLike(@Param('postId') postId: number, @Req() req: Request) {
    const userId = req.user.id;
    return this.likeService.removeLike(userId, postId);
  }

  @Get()
  async getLikes(@Param('postId') postId: number) {
    return this.likeService.getLikes(postId);
  }
}

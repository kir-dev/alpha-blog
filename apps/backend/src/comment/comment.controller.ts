import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

import { AuthGuard } from '@nestjs/passport';

@Controller('posts/:postId')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('comments')
  @UseGuards(AuthGuard('jwt'))
  create(@Param('postId', ParseIntPipe) postId: number, @Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.create(postId, createCommentDto);
  }

  @Delete('comments/:id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id', ParseIntPipe) id: number): Promise<Comment> {
    return this.commentService.remove(id);
  }

  @Get('comments')
  findAll(@Param('postId', ParseIntPipe) postId: number): Promise<{ comments: Comment[] }> {
    return this.commentService.findAll(postId);
  }
}

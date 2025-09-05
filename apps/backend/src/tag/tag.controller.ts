import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagService } from './tag.service';


@Controller('tags')
export class TagController{
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @Get(':tagName/posts')
  async findPostsByTag(@Param('tagName') tagName: string) {
    return this.tagService.findPostsByTag(tagName);
  }

}

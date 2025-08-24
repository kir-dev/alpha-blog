import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '@kir-dev/passport-authsch';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<{ users: User[] }> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt')) // Ha JWT-t használsz
  async getCurrentUser(@CurrentUser() user: User): Promise<User> {
    return this.userService.findMe(user.authSchId);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = this.userService.findOne(id);
    this.userService.remove(id);
    return user;
  }

  @Get(':id/followers')
  getFollowers(@Param('id', ParseIntPipe) id: number): Promise<User[]> {
    return this.userService.getFollowers(id);
  }

  @Get(':id/following')
  getFollowing(@Param('id', ParseIntPipe) id: number): Promise<User[]> {
    return this.userService.getFollowing(id);
  }

  /*@Get(':id/posts')
  getPosts(@Param('id', ParseIntPipe) id: number): Promise<Post[]> {
    return this.userService.getPosts(id);
  }*/
}

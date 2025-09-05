import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FollowModule } from './follow/follow.module';
import { LikeModule } from './like/like.module';

import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule.forRoot({ isGlobal: true }), PostModule, UserModule, FollowModule, LikeModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

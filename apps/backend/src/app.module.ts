import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FollowModule } from './follow/follow.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule.forRoot({ isGlobal: true }), PostModule, UserModule, FollowModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

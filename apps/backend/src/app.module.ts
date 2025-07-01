import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LikeModule } from './like/like.module';



@Module({
  imports: [PrismaModule.forRoot({ isGlobal: true }), LikeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

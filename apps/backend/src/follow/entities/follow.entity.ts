import { IsNotEmpty, IsString } from 'class-validator';

export class Follow {
  @IsNotEmpty()
  @IsString()
  followerId: number;

  @IsNotEmpty()
  @IsString()
  followingId: number;
}

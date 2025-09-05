import { IsNotEmpty, IsNumber } from 'class-validator';

export class Follow {
  @IsNotEmpty()
  @IsNumber()
  followerId: number;

  @IsNotEmpty()
  @IsNumber()
  followingId: number;
}

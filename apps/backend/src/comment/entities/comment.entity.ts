import { IsDate, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class Comment {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsDate()
  date: Date;

  @IsNumber()
  @IsPositive()
  postId: number;

  @IsNumber()
  @IsPositive()
  userId: number;
}

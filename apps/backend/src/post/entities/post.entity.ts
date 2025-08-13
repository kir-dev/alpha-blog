import { IsDate, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class Post {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  text: string;

  @IsNumber()
  @IsPositive()
  authorId: number;

  @IsDate()
  DateTime: Date;

  @IsString()
  image: string;
}

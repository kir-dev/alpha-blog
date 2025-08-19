import { IsNumber, IsPositive, IsString } from 'class-validator';

export class Tag {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsString()
  tagName: string;

}

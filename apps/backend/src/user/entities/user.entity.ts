import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class User {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsString()
  @IsPositive()
  @IsOptional()
  authSchId?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  profilePicture: string;
}

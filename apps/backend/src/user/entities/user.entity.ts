import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class User {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  password: string;

  constructor(id: number, name: string, email: string, password?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

import { IsEmail, IsString } from 'class-validator';

export class FindAllUserDto {
  @IsString()
  name?: string;

  @IsEmail()
  email?: string;
}

import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  readonly name?: string;

  @IsEmail()
  readonly email?: string;

  @IsNotEmpty()
  readonly password?: string;
}

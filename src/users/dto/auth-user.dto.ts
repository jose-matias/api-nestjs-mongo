import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}

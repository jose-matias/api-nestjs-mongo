import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { Observable } from 'rxjs';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  password: string;
}

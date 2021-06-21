import { IsNumberString, IsString } from 'class-validator';

export class FindAllUserDto {
  @IsString()
  name: string;

  @IsNumberString()
  page: number;

  @IsNumberString()
  limit: number;
}

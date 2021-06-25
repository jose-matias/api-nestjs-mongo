import { Body, Controller, Post, Get, Patch, Delete, Query, Param, NotFoundException, HttpCode } from '@nestjs/common';
import { AuthUserDto, CreateUserDto, FindOneUserDto, FindAllUserDto, UpdateUserDto } from './dto';

import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { Login } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService, private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() authUserDto: AuthUserDto): Promise<Login> {
    return this.userService.login(authUserDto);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await this.authService.hashPassword(createUserDto.password);
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(@Query() query: FindAllUserDto): Promise<User[]> {
    return this.userService.findAll(query);
  }

  @Get(':id')
  async findById(@Param() param: FindOneUserDto): Promise<User> {
    const user = await this.userService.findById(param.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.userService.remove(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return;
  }
}

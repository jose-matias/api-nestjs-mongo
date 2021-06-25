import { BadGatewayException, ForbiddenException, Injectable } from '@nestjs/common';
import { AuthUserDto, CreateUserDto, FindAllUserDto, UpdateUserDto } from './dto';

import { Login } from './interfaces/user.interface';
import { User } from './schemas/user.schema';
import { UserRepository } from './users.repository';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository, private readonly authService: AuthService) {}

  async login(data: AuthUserDto): Promise<Login> {
    const user = await this.findOne({ email: data.email });

    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    const token = await this.authService.generateJWT(user);

    if (!this.authService.comparePassword(data.password, user.password)) {
      throw new ForbiddenException('Invalid credentials');
    }

    return {
      user,
      token,
    };
  }

  async create(data: CreateUserDto): Promise<User> {
    if (await this.findOne({ email: data.email })) {
      throw new BadGatewayException('User already exists');
    }

    return this.userRepository.create(data);
  }

  async findOne(query: FindAllUserDto): Promise<User> {
    return this.userRepository.findOne(query);
  }

  async findAll(query: FindAllUserDto): Promise<User[]> {
    return this.userRepository.find(query);
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: string) {
    return this.userRepository.findByIdAndRemove(id);
  }
}

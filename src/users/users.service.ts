import { Injectable } from '@nestjs/common';
import { CreateUserDto, FindAllUserDto, UpdateUserDto } from './dto';

import { User } from './schemas/user.schema';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: CreateUserDto): Promise<User> {
    return this.userRepository.create(data);
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

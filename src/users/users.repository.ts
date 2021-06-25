import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto, FindAllUserDto, UpdateUserDto } from './dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findOne(query: FindAllUserDto): Promise<User> {
    return this.userModel.findOne(query);
  }

  async find(query: FindAllUserDto): Promise<User[]> {
    return this.userModel.find(query);
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async findByIdAndUpdate(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findOneAndUpdate({ _id: id }, updateUserDto, { new: true });
  }

  async findByIdAndRemove(id: string) {
    return this.userModel.findOneAndRemove({ _id: id });
  }
}

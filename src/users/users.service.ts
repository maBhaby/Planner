import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { stringify } from 'querystring';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: User): Promise<User> {
    const createdPost = await this.userModel.create(user);
    return createdPost;
  }

  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getById(id: string): Promise<User> {
    if (!id) {
      throw new Error('ID не указан');
    }
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  async delete(id: string): Promise<User> {
    if (!id) {
      throw new Error('ID не указан');
    }
    const deletedPost = await this.userModel.findByIdAndDelete(id);
    return deletedPost;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: User): Promise<User> {
    const createdUser = await this.userModel.create(user);
    return createdUser;
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

  async getByName(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username: username });
  }
}

import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async singIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getByName(username);

    if (!bcrypt.compareSync(pass, user?.password)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(username: string, pass: string): Promise<User> {
    const candidate = await this.usersService.getByName(username);
    if (candidate) {
      throw new HttpException(
        { reason: 'Пользователь с таким именем уже существует' },
        HttpStatus.CONFLICT,
      );
    }

    const hashedPass = bcrypt.hashSync(pass, 10);

    const user = new User(username, hashedPass);
    user._id = new mongoose.Types.ObjectId();
    this.usersService.create(user);
    return user;
  }
}

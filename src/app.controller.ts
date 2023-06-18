import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './users/schemas/user.schema';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService,
  ) {}

  @Get()
  getHello(): any {
    return 'Hello World!';
  }
}

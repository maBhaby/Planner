import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

//https://docs.nestjs.com/techniques/mongodb
const DB_URL =
  'mongodb+srv://elveninsomnia:v9oll2m90sdl@cluster0.z1aczgk.mongodb.net/';

@Module({
  imports: [UsersModule, MongooseModule.forRoot(DB_URL), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

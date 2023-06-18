import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  constructor(name: string, password: string, roles: string[]) {
    this.name = name;
    this.password = password;
    this.roles = roles;
  }

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: ['USER'] })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

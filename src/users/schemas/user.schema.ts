import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

const validateEmail = (email: string): boolean => {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

@Schema()
export class User {
  constructor(name: string, password: string, roles: string[]) {
    this.name = name;
    this.password = password;
    this.roles = roles;
  }

  @Prop({
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 16,
  })
  name: string;

  @Prop({ required: true, trim: true })
  password: string;

  @Prop({ trim: true, validate: [validateEmail] })
  email: string;

  @Prop({ default: ['USER'] })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

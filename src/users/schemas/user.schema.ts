import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

const validateEmail = (email: string): boolean => {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

@Schema()
export class User {
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  @Prop({
    type: mongoose.Types.ObjectId,
  })
  _id: mongoose.Types.ObjectId;

  @Prop({
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 16,
  })
  username: string;

  @Prop({ required: true, trim: true, unique: false })
  password: string;

  @Prop({ trim: true, validate: [validateEmail] })
  email: string;

  @Prop({ default: ['USER'] })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

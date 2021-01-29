import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './model/user';
import { Model } from 'mongoose';
import { NewuserDto } from "./dto/newuser.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async findOne(email: string): Promise<User | undefined> {
    return await this.userModel.findOne({ email }).exec();
  }

  async addUser(newUser: NewuserDto): Promise<User> {
    const user = new this.userModel(newUser);
    return await user.save();
  }
}

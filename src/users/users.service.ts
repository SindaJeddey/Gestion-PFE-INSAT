import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './model/user.model';
import { NewUserDto } from './model/dto/newUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async findOne(email: string): Promise<User | undefined> {
    return await this.userModel.findOne({ email }).exec();
  }

  async newUser(newUser: NewUserDto) {
    const user = new this.userModel(newUser);
    user.salt = await bcrypt.genSalt();
    const password = UsersService.generatePassword();
    user.password = await bcrypt.hash(password, user.salt);
    //envoyer mail
    return await user.save();
  }

  private static generatePassword(): string {
    return Math.random().toString(36).slice(-8);
  }
}

import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './model/user.model';
import { NewUserDto } from './model/dto/newUser.dto';
import * as bcrypt from 'bcrypt';
import { MailingService } from "../mailing/mailing.service";
import { UpdatedUserDto } from "./model/dto/updated-user.dto";
import { AcademicYearService } from "../academic-year/academic-year.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private mailingService: MailingService,
    private academicYearService: AcademicYearService
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return await this.userModel.findOne({ email }).exec();
  }

  async newUser(newUser: NewUserDto) {
    await this.academicYearService.getCurrentAcademicYear();
    const existingUser = await this.userModel.findOne({ email: newUser.email });
    if (existingUser)
      throw new ConflictException(`User ${newUser.email} already existing.`);
    const user = new this.userModel(newUser);
    user.salt = await bcrypt.genSalt();
    const password = UsersService.generatePassword();
    user.password = await bcrypt.hash(password, user.salt);
    await this.mailingService.sendEmail(
      newUser.email,
      'Successful Subscription',
      `You now have access to the platform.\nYour credentials are:\n EMAIL: ${user.email}\n PASSWORD:${password}`
    );
    return await user.save();
  }

  private static generatePassword(): string {
    return Math.random().toString(36).slice(-8);
  }

  async changePassword(email: string, updatedUser: UpdatedUserDto) {
    if (email !== updatedUser.email)
      throw new UnauthorizedException("Can't change password of another user");
    const user = await this.findOne(updatedUser.email);
    const newPassword = await bcrypt.hash(updatedUser.newPassword, user.salt);
    const newUpdatedUser = await user.update(
      { password: newPassword },
      { new: true },
    );
    if (updatedUser)
      await this.mailingService.sendEmail(
        newUpdatedUser.email,
        'Successful Password Change',
        `Your password have been successfully changed. Please login again to the platform.`,
      );
  }
}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './model/user.model';
import { UsersController } from './users.controller';
import { MailingModule } from '../mailing/mailing.module';
import { AcademicYearModule } from "../academic-year/academic-year.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MailingModule,
    AcademicYearModule
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

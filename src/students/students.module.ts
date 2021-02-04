import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './model/student.model';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { UsersModule } from '../users/users.module';
import { MailingService } from "../mailing/mailing.service";
import { MailingModule } from "../mailing/mailing.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
    UsersModule,
    MailingModule,
  ],
  exports: [StudentsService],
  providers: [StudentsService],
  controllers: [StudentsController],
})
export class StudentsModule {}

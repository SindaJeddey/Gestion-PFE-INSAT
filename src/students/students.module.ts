import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './model/student.model';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
    UsersModule,
  ],
  exports: [StudentsService],
  providers: [StudentsService],
  controllers: [StudentsController],
})
export class StudentsModule {}

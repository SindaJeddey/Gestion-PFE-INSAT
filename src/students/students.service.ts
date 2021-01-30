import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './model/student.model';
import { UsersService } from '../users/users.service';
import { NewStudentDto } from './model/dto/new-student.dto';
import { Roles } from '../users/model/roles';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel('Student') private studentModel: Model<Student>,
    private userService: UsersService,
  ) {}

  async addStudent(newStudent: NewStudentDto): Promise<Student> {
    const student = new this.studentModel(newStudent);
    const savedStudent = this.userService.newUser({
      email: newStudent.email,
      role: Roles.STUDENT,
    });
    if (savedStudent) return await student.save();
  }

  async getStudent(email: string): Promise<Student> {
    return await this.studentModel.findOne({ email }).exec();
  }

  async getAllStudent(): Promise<Student[]> {
    return await this.studentModel.find().exec();
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './model/student.model';
import { UsersService } from '../users/users.service';
import { NewStudentDto } from './model/dto/new-student.dto';
import { Roles } from '../users/model/roles';
import { UpdatedStudentDto } from './model/dto/updated-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel('Student') private studentModel: Model<Student>,
    private userService: UsersService,
  ) {}

  async addStudent(newStudent: NewStudentDto): Promise<Student> {
    const student = new this.studentModel(newStudent);
    const savedStudent = await this.userService.newUser({
      email: newStudent.email,
      role: Roles.STUDENT,
    });
    return await student.save();
  }

  async getStudent(id: string): Promise<Student> {
    const student = await this.studentModel.findById(id).exec();
    if (!student) throw new NotFoundException(`Student id ${id} not found`);
    return student;
  }

  async getAllStudent(): Promise<Student[]> {
    return await this.studentModel.find().exec();
  }

  async updateStudent(
    id: string,
    updates: UpdatedStudentDto,
  ): Promise<Student> {
    const updatedStudent = await this.studentModel.findByIdAndUpdate(
      id,
      { ...updates },
      { new: true },
    );
    if (!updatedStudent)
      throw new NotFoundException(`Student id ${id} not found`);
    return updatedStudent;
  }
}

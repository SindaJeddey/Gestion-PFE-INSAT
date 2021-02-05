import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './model/student.model';
import { UsersService } from '../users/users.service';
import { NewStudentDto } from './model/dto/new-student.dto';
import { Role } from '../users/model/role.enum';
import { UpdatedStudentDto } from './model/dto/updated-student.dto';
import { MailingService } from '../mailing/mailing.service';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel('Student') private studentModel: Model<Student>,
    private userService: UsersService,
    private mailingService: MailingService,
  ) {}

  async addStudent(newStudent: NewStudentDto): Promise<Student> {
    const student = new this.studentModel(newStudent);
    const savedStudent = await this.userService.newUser({
      email: newStudent.email,
      role: Role.STUDENT,
    });
    if (savedStudent) return await student.save();
  }

  async getStudent(studentId: string): Promise<Student> {
    const student = await this.studentModel.findById(studentId).exec();
    if (!student) throw new NotFoundException(`Student id ${studentId} not found`);
    return student;
  }

  async getAllStudent(): Promise<Student[]> {
    return await this.studentModel.find().exec();
  }

  async updateStudent(
    studentId: string,
    updates: UpdatedStudentDto,
  ): Promise<Student> {
    const updatedStudent = await this.studentModel.findByIdAndUpdate(
      studentId,
      { ...updates },
      { new: true },
    );
    if (!updatedStudent)
      throw new NotFoundException(`Student id ${studentId} not found`);
    else {
      await this.mailingService.sendEmail(
        updatedStudent.email,
        'Profile Update',
        `Dear ${updatedStudent.name} ${updatedStudent.lastName},\n Your profile has been updated. Please check the platform for more details.`,
      );
      return updatedStudent;
    }
  }
}

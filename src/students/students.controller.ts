import { Body, Controller, Get, Post } from '@nestjs/common';
import { StudentsService } from './students.service';
import { NewStudentDto } from './model/dto/new-student.dto';
import { Student } from './model/student.model';

@Controller('students')
export class StudentsController {
  constructor(
    private studentsService: StudentsService,
  ) {}

  @Post()
  async addStudent(@Body() newStudent: NewStudentDto): Promise<Student> {
    return await this.studentsService.addStudent(newStudent);
  }

  @Get()
  async getStudent(@Body('email') email: string): Promise<Student> {
    return await this.studentsService.getStudent(email);
  }

  @Get('/all')
  async getStudents(): Promise<Student[]> {
    return await this.studentsService.getAllStudent();
  }
}

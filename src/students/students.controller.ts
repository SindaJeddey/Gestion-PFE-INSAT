import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { StudentsService } from './students.service';
import { NewStudentDto } from './model/dto/new-student.dto';
import { Student } from './model/student.model';
import { UpdatedStudentDto } from './model/dto/updated-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Post()
  async addStudent(@Body() newStudent: NewStudentDto): Promise<Student> {
    return await this.studentsService.addStudent(newStudent);
  }

  @Get(':id')
  async getStudent(@Param('id') id: string): Promise<Student> {
    return await this.studentsService.getStudent(id);
  }

  @Get()
  async getStudents(): Promise<Student[]> {
    return await this.studentsService.getAllStudent();
  }

  @Put(':id')
  async updateStudent(
    @Param('id') id: string,
    @Body() updates: UpdatedStudentDto,
  ): Promise<Student> {
    return await this.studentsService.updateStudent(id, updates);
  }
}

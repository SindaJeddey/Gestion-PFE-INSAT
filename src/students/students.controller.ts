import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { StudentsService } from './students.service';
import { NewStudentDto } from './model/dto/new-student.dto';
import { Student } from './model/student.model';
import { UpdatedStudentDto } from './model/dto/updated-student.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Post()
  @ApiOperation({ description: 'Adding a student by the admin.' })
  @ApiResponse({ status: 201, description: 'Student successfully added.' })
  async addStudent(@Body() newStudent: NewStudentDto): Promise<Student> {
    return await this.studentsService.addStudent(newStudent);
  }

  @Get(':id')
  @ApiOperation({ description: 'Retrieving a student.' })
  @ApiResponse({ status: 201, description: 'Student successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  async getStudent(@Param('id') id: string): Promise<Student> {
    return await this.studentsService.getStudent(id);
  }

  @Get()
  @ApiOperation({ description: 'Retrieving all students.' })
  @ApiResponse({ status: 201, description: 'Students successfully retrieved.' })
  async getStudents(): Promise<Student[]> {
    return await this.studentsService.getAllStudent();
  }

  @Put(':id')
  @ApiOperation({ description: 'Updating a student by the admin.' })
  @ApiResponse({ status: 201, description: 'Student successfully updated.' })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  async updateStudent(
    @Param('id') id: string,
    @Body() updates: UpdatedStudentDto,
  ): Promise<Student> {
    return await this.studentsService.updateStudent(id, updates);
  }
}

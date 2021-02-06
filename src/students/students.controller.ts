import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { StudentsService } from './students.service';
import { NewStudentDto } from './model/dto/new-student.dto';
import { Student } from './model/student.model';
import { UpdatedStudentDto } from './model/dto/updated-student.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../users/model/role.enum';
import { User } from '../decorators/user.decorator';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ description: 'Adding a student.' })
  @ApiResponse({ status: 201, description: 'Student successfully added.' })
  async addStudent(
    @User() user,
    @Body() newStudent: NewStudentDto,
  ): Promise<Student> {
    console.log(user);
    return await this.studentsService.addStudent(newStudent);
  }

  @Get('profile')
  @Roles(Role.STUDENT)
  @ApiOperation({ description: 'Retrieving a student.' })
  @ApiResponse({ status: 201, description: 'Student successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  async getStudentProfile(@User() student): Promise<Student> {
    return await this.studentsService.getStudentByEmail(student.email);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ description: 'Retrieving a student.' })
  @ApiResponse({ status: 201, description: 'Student successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  async getStudent(@Param('id') studentId: string, @User() user): Promise<Student> {
    return await this.studentsService.getStudentById(studentId);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ description: 'Retrieving all students.' })
  @ApiResponse({ status: 201, description: 'Students successfully retrieved.' })
  async getStudents(): Promise<Student[]> {
    return await this.studentsService.getAllStudent();
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ description: 'Updating a student' })
  @ApiResponse({ status: 201, description: 'Student successfully updated.' })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  async updateStudent(
    @Param('id') studentId: string,
    @Body() updates: UpdatedStudentDto,
  ): Promise<Student> {
    return await this.studentsService.updateStudent(studentId, updates);
  }
}

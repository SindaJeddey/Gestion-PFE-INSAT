import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { NewStudentDto } from './model/dto/new-student.dto';
import { Student } from './model/student.model';
import { UpdatedStudentDto } from './model/dto/updated-student.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from '../decorators/user.decorator';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../users/model/role.enum';

@ApiTags('Students')
@ApiBearerAuth()

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Get('profile')
  @Roles(Role.STUDENT)
  @ApiOperation({ description: 'Retrieving a student.' })
  @ApiResponse({ status: 200, description: 'Student successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  async getStudentProfile(@User() student): Promise<Student> {
    return await this.studentsService.getStudentByEmail(student.email);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ description: 'Retrieving a student.' })
  @ApiResponse({ status: 200, description: 'Student successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  async getStudent(@Param('id') studentId: string): Promise<Student> {
    return await this.studentsService.getStudentById(studentId);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ description: 'Retrieving all students.' })
  @ApiResponse({ status: 200, description: 'Students successfully retrieved.' })
  async getStudents(): Promise<Student[]> {
    return await this.studentsService.getAllStudent();
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ description: 'Adding students.' })
  @ApiResponse({ status: 204, description: 'Students successfully added.' })
  @ApiBody({ type: [NewStudentDto] })
  async addStudents(@Body() newStudents: NewStudentDto[]) {
    await this.studentsService.addStudents(newStudents);
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

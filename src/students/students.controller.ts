import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { StudentsService } from './students.service';
import { NewStudentDto } from './model/dto/new-student.dto';
import { Student } from './model/student.model';
import { UpdatedStudentDto } from './model/dto/updated-student.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../users/model/role.enum';
import { User } from '../decorators/user.decorator';
import { Public } from "../decorators/public.decorator";

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Get('profile')
  // @Roles(Role.STUDENT)
  @Public()
  @ApiOperation({ description: 'Retrieving a student.' })
  @ApiResponse({ status: 200, description: 'Student successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  async getStudentProfile(@User() student): Promise<Student> {
    console.log(student);
    return await this.studentsService.getStudentByEmail(student.email);
  }

  @Get(':id')
  // @Roles(Role.ADMIN)
  @Public()
  @ApiOperation({ description: 'Retrieving a student.' })
  @ApiResponse({ status: 200, description: 'Student successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  async getStudent(@Param('id') studentId: string, @User() user): Promise<Student> {
    return await this.studentsService.getStudentById(studentId);
  }

  @Get()
  // @Roles(Role.ADMIN)
  @Public()
  @ApiOperation({ description: 'Retrieving all students.' })
  @ApiResponse({ status: 200, description: 'Students successfully retrieved.' })
  async getStudents(): Promise<Student[]> {
    return await this.studentsService.getAllStudent();
  }

  @Post()
  // @Roles(Role.ADMIN)
  @Public()
  @ApiOperation({ description: 'Adding students.' })
  @ApiResponse({ status: 204, description: 'Students successfully added.' })
  async addStudents(@Body() newStudents: NewStudentDto[]) {
    await this.studentsService.addStudents(newStudents);
  }

  @Put(':id')
  // @Roles(Role.ADMIN)
  @Public()
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

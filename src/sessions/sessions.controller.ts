import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { SessionsService } from "./sessions.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { NewSessionDto } from "./model/dto/new-session.dto";
import { Session } from "./model/session.model";
import { UpdatedSessionDto } from "./model/dto/updated-session.dto";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "../users/model/role.enum";
import { SessionDto } from "./model/dto/session.dto";
import { User } from "../decorators/user.decorator";
import { Public } from "../decorators/public.decorator";

@Controller('sessions')
@ApiTags('Sessions')
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @Get(':id')
  // @Roles(Role.ADMIN, Role.STUDENT, Role.PROFESSOR)
  @Public()
  @ApiOperation({ description: 'Get a session.' })
  @ApiResponse({ status: 200, description: 'Session successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Session not found.' })
  async getSession(@Param('id') sessionId: string): Promise<Session> {
    return await this.sessionsService.getSession(sessionId);
  }

  @Get()
  // @Roles(Role.ADMIN)
  @Public()
  @ApiOperation({ description: 'Get current academic year sessions.' })
  @ApiResponse({ status: 200, description: 'Sessions successfully retrieved.' })
  async getCurrentYearSessions(): Promise<Session[]> {
    return await this.sessionsService.getCurrentYearSessions();
  }

  @Post()
  // @Roles(Role.ADMIN)
  @Public()
  @ApiOperation({
    description:
      'Creating a new session and affecting it to the current academic year.',
  })
  @ApiResponse({ status: 201, description: 'Session successfully created.' })
  async newSession(@Body() newSession: NewSessionDto): Promise<Session> {
    return this.sessionsService.createNewSession(newSession);
  }

  @Put('reserve')
  @Roles(Role.STUDENT)
  // @Public()
  async reserveSession(
    @Body() reserveSession: SessionDto,
    @User() student,
  ) {
    await this.sessionsService.reserveSession(reserveSession,student.email);
  }

  @Put('confirm')
  @Roles(Role.STUDENT)
  // @Public()
  async confirmSession(@User() student) {
    await this.sessionsService.confirmProject(student.email);
  }

  @Put(':id')
  // @Roles(Role.ADMIN)
  @Public()
  @ApiOperation({ description: 'Update a session.' })
  @ApiResponse({ status: 201, description: 'Session successfully updated.' })
  @ApiResponse({ status: 404, description: 'Session not found.' })
  async updateSession(
    @Param('id') sessionId: string,
    @Body() updates: UpdatedSessionDto,
  ): Promise<Session> {
    return await this.sessionsService.updateSession(sessionId, updates);
  }

  @Delete(':id')
  // @Roles(Role.ADMIN)
  @Public()
  @ApiOperation({ description: 'Delete a session.' })
  @ApiResponse({ status: 204, description: 'Session successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Session not found.' })
  async deleteSession(@Param('id') sessionId: string) {
    await this.sessionsService.deleteSession(sessionId);
  }
}

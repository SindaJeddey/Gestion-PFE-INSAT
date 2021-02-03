import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { SessionsService } from './sessions.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NewSessionDto } from './model/dto/new-session.dto';
import { Session } from './model/session.model';

@Controller('sessions')
@ApiTags('Sessions')
export class SessionsController {
  Project;
  constructor(private sessionsService: SessionsService) {}

  @Post()
  @ApiOperation({
    description:
      'Creating a new session and affecting it to the current academic year.',
  })
  @ApiResponse({ status: 201, description: 'Session successfully created.' })
  async newSession(@Body() newSession: NewSessionDto): Promise<Session> {
    return this.sessionsService.createNewSession(newSession);
  }

  @Get()
  @ApiOperation({ description: 'Get current academic year sessions.' })
  @ApiResponse({ status: 201, description: 'Sessions successfully retrieved.' })
  async getCurrentYearSessions(): Promise<Session[]> {
    return await this.sessionsService.getCurrentYearSessions();
  }

  @Get(':id')
  @ApiOperation({ description: 'Get a session.' })
  @ApiResponse({ status: 201, description: 'Session successfully retrieved.' })
  async getSession(@Param('id') id: string): Promise<Session> {
    return await this.sessionsService.getSession(id);
  }


}

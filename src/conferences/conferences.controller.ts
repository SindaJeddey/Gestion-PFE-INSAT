import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ConferencesService } from './conferences.service';
import { NewConferenceDto } from './model/dto/new-conference.dto';
import { Conference } from './model/conference.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateConferenceDto } from './model/dto/update-conference.dto';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../users/model/role.enum';
import { User } from '../decorators/user.decorator';
import { Public } from '../decorators/public.decorator';

@Controller('conferences')
@ApiTags('Conferences')
export class ConferencesController {
  constructor(private conferencesService: ConferencesService) {}

  @Get('professor')
  @Roles(Role.PROFESSOR, Role.ADMIN)
  @ApiOperation({ description: 'Retrieving conferences of professor.' })
  @ApiResponse({
    status: 200,
    description: 'Conferences successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'Professor not found.' })
  async getProfessorConferences(
    @User() professor,
  ): Promise<Conference[]> {
    return await this.conferencesService.getProfessorConference(
      professor.email,
    );
  }

  @Get('session/:id')
  // @Roles(Role.ADMIN, Role.STUDENT, Role.PROFESSOR)
  @Public()
  @ApiOperation({ description: 'Retrieving conferences of a given session.' })
  @ApiResponse({
    status: 200,
    description: 'Conferences successfully retrieved.',
  })
  @ApiResponse({
    status: 400,
    description: 'Professors or date/room unavailable.',
  })
  async getConferencesPerSession(
    @Param('id') conferenceId: string,
  ): Promise<Conference[]> {
    return await this.conferencesService.getConferencesPerSession(conferenceId);
  }

  @Post()
  // @Roles(Role.ADMIN)
  @Public()
  @ApiOperation({ description: 'Creating a conference.' })
  @ApiResponse({ status: 201, description: 'Conference successfully created.' })
  async createConference(
    @Body() newConference: NewConferenceDto,
  ): Promise<Conference> {
    return await this.conferencesService.createConference(newConference);
  }

  @Put(':id')
  // @Roles(Role.ADMIN)
  @Public()
  @ApiOperation({ description: 'Updating a conference.' })
  @ApiResponse({ status: 200, description: 'Conference successfully updated.' })
  @ApiResponse({ status: 404, description: 'Conference not found.' })
  @ApiResponse({
    status: 400,
    description: 'Professors or date/room unavailable.',
  })
  async updateConference(
    @Param('id') conferenceId: string,
    @Body() updates: UpdateConferenceDto,
  ){
    await this.conferencesService.updateConference(conferenceId, updates);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ description: 'Deleting a conference.' })
  @ApiResponse({ status: 204, description: 'Conference successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Conference not found.' })
  async deleteConference(@Param('id') conferenceId: string) {
    await this.conferencesService.deleteConference(conferenceId);
  }
}

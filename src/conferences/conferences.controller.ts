import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ConferencesService } from "./conferences.service";
import { NewConferenceDto } from "./model/dto/new-conference.dto";
import { Conference } from "./model/conference.model";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateConferenceDto } from "./model/dto/update-conference.dto";
import { Roles } from "../decorators/role.decorator";
import { Role } from "../users/model/role.enum";

@Controller('conferences')
@ApiTags('Conferences')
export class ConferencesController {
  constructor(private conferencesService: ConferencesService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ description: 'Creating a conference.' })
  @ApiResponse({ status: 201, description: 'Conference successfully created.' })
  async createConference(
    @Body() newConference: NewConferenceDto,
  ): Promise<Conference> {
    return await this.conferencesService.createConference(newConference);
  }

  @Get('session/:id')
  @Roles(Role.ADMIN, Role.STUDENT, Role.PROFESSOR)
  @ApiOperation({ description: 'Retrieving conferences of a given session.' })
  @ApiResponse({ status: 201, description: 'Conferences successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Professors or date/room unavailable.' })
  async getConferencesPerSession(
    @Param('id') conferenceId: string,
  ): Promise<Conference[]> {
    return await this.conferencesService.getConferencesPerSession(conferenceId);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ description: 'Updating a conference.' })
  @ApiResponse({ status: 201, description: 'Conference successfully updated.' })
  @ApiResponse({ status: 404, description: 'Conference not found.' })
  @ApiResponse({ status: 400, description: 'Professors or date/room unavailable.' })
  async updateConference(
    @Param('id') conferenceId: string,
    @Body() updates: UpdateConferenceDto,
  ): Promise<Conference> {
    return await this.conferencesService.updateConference(
      conferenceId,
      updates,
    );
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ description: 'Deleting a conference.' })
  @ApiResponse({ status: 201, description: 'Conference successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Conference not found.' })
  async deleteConference(@Param('id') conferenceId: string) {
    await this.conferencesService.deleteConference(conferenceId);
  }
}

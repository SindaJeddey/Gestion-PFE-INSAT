import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ConferencesService } from './conferences.service';
import { NewConferenceDto } from './model/dto/new-conference.dto';
import { Conference } from './model/conference.model';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateConferenceDto } from "./model/dto/update-conference.dto";

@Controller('conferences')
@ApiTags('Conferences')
export class ConferencesController {
  constructor(private conferencesService: ConferencesService) {}

  @Post()
  @ApiOperation({ description: 'Creating a conference.' })
  @ApiResponse({ status: 201, description: 'Conference successfully created.' })
  async createConference(
    @Body() newConference: NewConferenceDto,
  ): Promise<Conference> {
    return await this.conferencesService.createConference(newConference);
  }

  @Get('session/:id')
  @ApiOperation({ description: 'Retrieving conferences of a given session.' })
  @ApiResponse({ status: 201, description: 'Conferences successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Professors or date/room unavailable.' })
  async getConferencesPerSession(
    @Param('id') id: string,
  ): Promise<Conference[]> {
    return await this.conferencesService.getConferencesPerSession(id);
  }

  @Put(':id')
  @ApiOperation({ description: 'Updating a conference.' })
  @ApiResponse({ status: 201, description: 'Conference successfully updated.' })
  @ApiResponse({ status: 404, description: 'Conference not found.' })
  @ApiResponse({ status: 400, description: 'Professors or date/room unavailable.' })
  async updateConference(
    @Param('id') id: string,
    @Body() updates: UpdateConferenceDto,
  ): Promise<Conference> {
    return await this.conferencesService.updateConference(id, updates);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Updating a conference.' })
  @ApiResponse({ status: 201, description: 'Conference successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Conference not found.' })
  async deleteConference(@Param('id') id: string) {
    await this.conferencesService.deleteConference(id);
  }
}

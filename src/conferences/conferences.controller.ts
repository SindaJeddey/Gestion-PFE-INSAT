import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ConferencesService } from './conferences.service';
import { NewConferenceDto } from './model/dto/new-conference.dto';
import { Conference } from './model/conference.model';
import { ApiTags } from '@nestjs/swagger';
import { UpdateConferenceDto } from "./model/dto/update-conference.dto";

@Controller('conferences')
@ApiTags('Conferences')
export class ConferencesController {
  constructor(private conferencesService: ConferencesService) {}

  @Post()
  async createConference(
    @Body() newConference: NewConferenceDto,
  ): Promise<Conference> {
    return await this.conferencesService.createConference(newConference);
  }

  @Get('session/:id')
  async getConferencesPerSession(
    @Param('id') id: string,
  ): Promise<Conference[]> {
    return await this.conferencesService.getConferencesPerSession(id);
  }

  @Put(':id')
  async updateConference(
    @Param('id') id: string,
    @Body() updates: UpdateConferenceDto,
  ): Promise<Conference> {
    return await this.conferencesService.updateConference(id, updates);
  }
}

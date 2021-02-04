import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ConferenceRooms } from '../conference-rooms.enum';

export class UpdateConferenceDto {
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  date: Date;

  @IsString()
  @IsOptional()
  president: string | any;

  @IsString()
  @IsOptional()
  inspector: string | any;

  @IsString()
  @IsEnum(ConferenceRooms)
  @IsOptional()
  room: string;
}

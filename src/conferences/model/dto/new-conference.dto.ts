import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";
import { ConferenceRooms } from "../conference-rooms.enum";

export class NewConferenceDto {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  @IsString()
  @IsNotEmpty()
  session: string;

  @IsString()
  @IsNotEmpty()
  president: string;

  @IsString()
  @IsNotEmpty()
  inspector: string;

  @IsString()
  @IsNotEmpty()
  project: string;

  @IsString()
  @IsEnum(ConferenceRooms)
  @IsNotEmpty()
  room: string;
}

import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";
import { ConferenceRooms } from "../conference-rooms.enum";
import { ApiProperty } from "@nestjs/swagger";

export class NewConferenceDto {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @ApiProperty({ type: Date, required: true })
  date: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, description: 'Session ID' })
  session: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, description: 'President ID' })
  president: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, description: 'Inspector ID' })
  inspector: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, description: 'Project ID' })
  project: string;

  @IsString()
  @IsEnum(ConferenceRooms)
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, enum: ['2B6-1','2B6-2','2B6-3','2B6-4'] })
  room: string;
}

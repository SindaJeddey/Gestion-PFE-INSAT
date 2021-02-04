import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ConferenceRooms } from '../conference-rooms.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateConferenceDto {
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiProperty({ type: String, required: true })
  date: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: true, description: 'President ID' })
  president: string | any;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: true, description: 'Inspector ID' })
  inspector: string | any;

  @IsString()
  @IsEnum(ConferenceRooms)
  @ApiProperty({ type: String, required: true, description: 'Session ID' })
  @ApiProperty({
    type: String,
    required: true,
    enum: ['2B6-1', '2B6-2', '2B6-3', '2B6-4'],
  })
  @IsOptional()
  room: string;
}

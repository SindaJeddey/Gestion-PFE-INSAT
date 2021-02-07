import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SessionDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, description: `Wanted Session ID` })
  sessionId: string;

}

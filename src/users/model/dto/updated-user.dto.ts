import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UpdatedUserDto {

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

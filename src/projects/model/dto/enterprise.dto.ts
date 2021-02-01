import { IsNotEmpty, IsString } from 'class-validator';

export class EnterpriseDto{
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  contact: string;
}

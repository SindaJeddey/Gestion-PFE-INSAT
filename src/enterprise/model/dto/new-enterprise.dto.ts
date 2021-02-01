import { IsNotEmpty, IsString } from 'class-validator';

export class NewEnterpriseDto{
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

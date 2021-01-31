import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UserLoginDto } from '../users/model/dto/userLogin.dto';
import { NewUserDto } from '../users/model/dto/newUser.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('/login')
  @ApiOperation({ description: 'Login endpoint' })
  @ApiResponse({ status: 201, description: 'Successful login.' })
  @ApiResponse({ status: 404, description: 'User not found or wrong password.'})
  async login(@Body() loginCredentials: UserLoginDto) {
    return this.authenticationService.login(loginCredentials);
  }

  @Post('/new')
  @ApiOperation({ description: 'Temporary endpoint for adding new users' })
  @ApiResponse({ status: 201, description: 'User added succesfully.' })
  async register(@Body() newUser: NewUserDto) {
    return this.authenticationService.newUser(newUser);
  }
}

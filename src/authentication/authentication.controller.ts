import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UserLoginDto } from '../users/model/dto/userLogin.dto';
import { NewUserDto } from '../users/model/dto/newUser.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('/login')
  @Public()
  @ApiOperation({ description: 'Login endpoint' })
  @ApiResponse({ status: 201, description: 'Successful login.' })
  @ApiResponse({ status: 404, description: 'User not found or wrong password.'})
  async login(@Body() loginCredentials: UserLoginDto) {
    return this.authenticationService.login(loginCredentials);
  }

  @Post('/new')
  @Public()
  @ApiOperation({ description: 'Temporary endpoint for adding new users' })
  @ApiResponse({ status: 201, description: 'User added successfully.' })
  async register(@Body() newUser: NewUserDto) {
    return await this.authenticationService.newUser(newUser);
  }
}

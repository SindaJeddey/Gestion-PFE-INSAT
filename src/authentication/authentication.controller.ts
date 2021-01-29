import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthenticationService } from './authentication.service';
import { UserLoginDto } from '../users/model/dto/userLogin.dto';
import { NewUserDto } from '../users/model/dto/newUser.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('/login')
  async login(@Body() loginCredentials: UserLoginDto) {
    return this.authenticationService.login(loginCredentials);
  }

  @Post('/new')
  async register(@Body() newUser: NewUserDto) {
    return this.authenticationService.newUser(newUser);
  }

  @Get()
  hello() {
    return 'Authenticated';
  }
}

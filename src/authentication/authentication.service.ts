import { Injectable, NotFoundException } from '@nestjs/common';
import { UserLoginDto } from '../users/model/dto/userLogin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { NewUserDto } from '../users/model/dto/newUser.dto';
import { User } from '../users/model/user';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginCredentials: UserLoginDto) {
    const user = await this.userService.findOne(loginCredentials.email);
    if (!user)
      throw new NotFoundException(`Email ${loginCredentials.email} not found`);
    else {
      const hashedEnteredPassword = await bcrypt.hash(
        loginCredentials.password,
        user.salt,
      );
      if (hashedEnteredPassword !== user.password)
        throw new NotFoundException('Wrong Password');
      else {
        const payload = { email: user.email, role: user.role };
        return { 'access-token': this.jwtService.sign(payload) };
      }
    }
  }

  async newUser(newUser: NewUserDto): Promise<User> {
    return this.userService.newUser(newUser);
  }
}

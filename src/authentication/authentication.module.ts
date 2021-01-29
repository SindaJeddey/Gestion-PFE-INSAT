import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UsersService } from './users/users.service';

@Module({
  providers: [AuthenticationService, UsersService]
})
export class AuthenticationModule {}

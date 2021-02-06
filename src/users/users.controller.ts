import { Body, Controller, Put } from "@nestjs/common";
import { UpdatedUserDto } from "./model/dto/updated-user.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "./model/role.enum";
import { User } from "../decorators/user.decorator";

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Put('password')
  @Roles(Role.PROFESSOR, Role.ADMIN, Role.STUDENT)
  @ApiOperation({ description: "Updating a user's password" })
  @ApiResponse({ status: 201, description: 'Password successfully updated.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async changePassword(
    @User() user,
    @Body() updatedUserPassword: UpdatedUserDto,
  ) {
    await this.usersService.changePassword(user.email, updatedUserPassword);
  }


}

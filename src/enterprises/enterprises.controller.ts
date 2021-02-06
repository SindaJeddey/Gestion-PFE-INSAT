import { Controller, Get } from "@nestjs/common";
import { EnterprisesService } from "./enterprises.service";
import { Enterprise } from "./model/enterprise.model";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "../users/model/role.enum";

@ApiTags('Enterprise')
@Controller('enterprises')
export class EnterprisesController {
  constructor(private enterpriseService: EnterprisesService) {}

  @Get()
  @Roles(Role.STUDENT, Role.PROFESSOR, Role.ADMIN)
  @ApiOperation({ description: 'Retrieving all enterprises.' })
  @ApiResponse({ status: 201, description: 'Enterprises successfully retrieved.' })
  async getALlEnterprises(): Promise<Enterprise[]> {
    return await this.enterpriseService.getAllEnterprises();
  }
}

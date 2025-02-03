import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { GroupService } from './service/group.service';
import { ApprovedRoleGuard } from '../guards/approved_role.guard';
import { Role } from '../guards/decorator/role.decorator';
import { RoleTypeEnum } from '../../infrastructure/mySQL/entities/enums/roleType.enum';
import { BaseGroupResDto } from './models/dto/res/baseGroup.res.dto';

@ApiTags('students')
@Controller('students')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @ApiOperation({
    summary: 'Для вивантаження всіх group',
    description: 'Admin / manager може вивантажити всі group',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role(RoleTypeEnum.ADMIN || RoleTypeEnum.MANAGER)
  @Get()
  public async findAll(): Promise<BaseGroupResDto> {
    return await this.groupService.findAll();
  }
}

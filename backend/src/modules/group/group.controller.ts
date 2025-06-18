import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from './service/group.service';
import { ApprovedRoleGuard } from '../guards/approvedRole.guard';
import { Role } from '../decorators/role.decorator';
import { RoleTypeEnum } from '../../infrastructure/mysql/entities/enums/roleType.enum';
import { BaseGroupResDto } from './models/dto/res/baseGroup.res.dto';
import { TableNameEnum } from '../../infrastructure/mysql/entities/enums/tableName.enum';
import { BaseGroupReqDto } from './models/dto/req/baseGroup.req.dto';

@ApiTags(TableNameEnum.GROUP)
@Controller(TableNameEnum.GROUP)
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @ApiOperation({
    summary: 'Для вивантаження всіх group та пошуку по назві group  ',
    description:
      'Admin / manager може вивантажити всі group та здійснити пошук по назві group',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role([RoleTypeEnum.ADMIN, RoleTypeEnum.MANAGER])
  @Get()
  public async findAll(): Promise<BaseGroupResDto[] | null> {
    return await this.groupService.findAll();
  }

  @ApiOperation({
    summary: 'Для створення нової group',
    description: 'Admin / manager створити нову group',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role([RoleTypeEnum.ADMIN, RoleTypeEnum.MANAGER])
  @Post()
  public async create(
    @Body() group_name: BaseGroupReqDto,
  ): Promise<BaseGroupResDto> {
    return await this.groupService.create(group_name);
  }

  @ApiOperation({
    summary: 'Для видалення group по id',
    description: 'Admin може видалити group по id',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role([RoleTypeEnum.ADMIN])
  @Delete(':groupId')
  public async deleteId(@Param('groupId') groupId: number): Promise<string> {
    return await this.groupService.deleteId(groupId);
  }
}

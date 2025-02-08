import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from './service/group.service';
import { ApprovedRoleGuard } from '../guards/approvedRole.guard';
import { Role } from '../guards/decorator/role.decorator';
import { RoleTypeEnum } from '../../infrastructure/mysql/entities/enums/roleType.enum';
import { BaseGroupResDto } from './models/dto/res/baseGroup.res.dto';
import { ListGroupQueryReqDto } from './models/dto/req/listGroupQuery.req.dto';
import { StudentOwnershipGuard } from '../guards/statuseOrders.guard';
import { TableNameEnum } from '../../infrastructure/mysql/entities/enums/tableName.enum';

@ApiTags(TableNameEnum.GROUP)
@Controller(TableNameEnum.GROUP)
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
  public async findAll(
    query: ListGroupQueryReqDto,
  ): Promise<BaseGroupResDto[]> {
    return await this.groupService.findAll(query);
  }

  @ApiOperation({
    summary: 'Для створення нової group',
    description: 'Admin / manager створити нову group',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard, StudentOwnershipGuard)
  @Role(RoleTypeEnum.ADMIN || RoleTypeEnum.MANAGER)
  @Post(':studentId')
  public async create(
    // @CurrentUser() userData: IUserData,
    // @Param('studentId', ParseUUIDPipe) studentId: string,
    @Body() group: string,
  ): Promise<BaseGroupResDto> {
    return await this.groupService.create(group);
  }

  @ApiOperation({
    summary: 'Для видалення group по id',
    description: 'Admin може видалити group по id',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role(RoleTypeEnum.ADMIN)
  @Delete(':groupId')
  public async deleteId(
    @Param('groupId', ParseUUIDPipe) groupId: string,
  ): Promise<string> {
    return await this.groupService.deleteId(groupId);
  }
}

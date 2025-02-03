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
import { ApprovedRoleGuard } from '../guards/approved_role.guard';
import { Role } from '../guards/decorator/role.decorator';
import { RoleTypeEnum } from '../../infrastructure/mySQL/entities/enums/roleType.enum';
import { BaseGroupResDto } from './models/dto/res/baseGroup.res.dto';
import { ListGroupQueryReqDto } from './models/dto/req/listGroupQuery.req.dto';
import { CurrentUser } from '../auth/decorators/current_user.decorator';
import { IUserData } from '../auth/models/interfaces/user_data.interface';
import { UpdateStatusCheckReqDto } from '../students/models/dto/req/updateStatusСheck.req.dto';

@ApiTags('group')
@Controller('group')
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
    summary: 'Для вивантаження всіх group',
    description: 'Admin / manager може вивантажити всі group',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role(RoleTypeEnum.ADMIN || RoleTypeEnum.MANAGER)
  @Post()
  public async create(
    @CurrentUser() userData: IUserData,
    studentsData: UpdateStatusCheckReqDto,
    @Body() group: string,
  ): Promise<BaseGroupResDto> {
    return await this.groupService.create(group, userData, studentsData);
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

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './service/users.service';
import { TableNameEnum } from '../../infrastructure/mysql/entities/enums/tableName.enum';
import { RoleTypeEnum } from 'src/infrastructure/mysql/entities/enums/roleType.enum';
import { GiveRoleDto } from './models/dto/req/giveRole.dto';
import { UserMapper } from './service/user.mapper';
import { ApprovedRoleGuard } from '../guards/approvedRole.guard';
import { UserResDto } from './models/dto/res/user.res.dto';
import { Role } from '../decorators/role.decorator';
import { ListUsersQueryReqDto } from './models/dto/req/listUsersQuery.req.dto';
import { ListResQueryDto } from './models/dto/res/listUsersQuery.res.dto';

@ApiTags(TableNameEnum.USERS)
@Controller(TableNameEnum.USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Для видачі ролей',
    description: 'Користувач з ролю admin може видавати ролі',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role([RoleTypeEnum.ADMIN])
  @Post('role')
  async giveRole(@Body() giveRoleDto: GiveRoleDto): Promise<UserResDto> {
    const result = await this.usersService.giveRole(giveRoleDto);
    return UserMapper.toResDto(result);
  }

  @ApiOperation({
    summary: 'Для отримання інформацію по всім managers',
    description: 'Admin може отримати інформацію по всім managers',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role([RoleTypeEnum.ADMIN])
  @Get('all')
  public async findAll(
    @Query() query: ListUsersQueryReqDto, // Параметри передаються через @Query
  ): Promise<ListResQueryDto> {
    const [entities, total] = await this.usersService.findAll(query);
    return UserMapper.toAllResDtoList(entities, total, query);
  }

  @ApiOperation({
    summary: 'Для видалення облікового запису користувача (manager)',
    description:
      'Admin може видалити обліковий запис іншого користувача (manager) по його id ' +
      '*в БД в стовбчику deleted буде вказано дату видалення користувача.',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role([RoleTypeEnum.ADMIN])
  @Delete(':managerId')
  public async deleteId(
    @Param('managerId', ParseUUIDPipe) managerId: string,
  ): Promise<string> {
    return await this.usersService.deleteId(managerId);
  }
}

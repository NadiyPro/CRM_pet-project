import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { TableNameEnum } from '../../infrastructure/mysql/entities/enums/tableName.enum';
import { RoleTypeEnum } from 'src/infrastructure/mysql/entities/enums/roleType.enum';
import { GiveRoleDto } from './models/dto/req/giveRole.dto';
import { UserMapper } from './service/user.mapper';
import { ApprovedRoleGuard } from '../guards/approvedRole.guard';
import { UserResDto } from './models/dto/res/user.res.dto';
import { Role } from '../guards/decorator/role.decorator';

@ApiTags(TableNameEnum.USERS)
@Controller(TableNameEnum.USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Для видачі ролей',
    description: 'Користувач з ролю admin може видавати ролі',
    deprecated: true,
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role([RoleTypeEnum.ADMIN])
  @Post('role')
  async giveRole(@Body() giveRoleDto: GiveRoleDto): Promise<UserResDto> {
    const result = await this.usersService.giveRole(giveRoleDto);
    return UserMapper.toResDto(result);
  }

  // @ApiOperation({
  //   summary: 'Для отримання інформацію про всі облікові записи користувачів',
  //   description:
  //     'Admin може отримати інформацію про всі облікові записи користувачів',
  // })
  // @ApiBearerAuth()
  // @UseGuards(ApprovedRoleGuard)
  // @Role(RoleTypeEnum.ADMIN)
  // @Get('all')
  // public async findAll(
  //   @Query() query: ListUsersQueryReqDto, // Параметри передаються через @Query
  // ): Promise<ListResQueryDto> {
  //   const [entities, total] = await this.usersService.findAll(query);
  //   return UserMapper.toAllResDtoList(entities, total, query);
  // }

  // @ApiOperation({
  //   summary:
  //     'Для отримання інформацію статистику по заявках користувача за його id',
  //   description:
  //     'Admin може отримати інформацію про статистику по заявкам будь якого користувача по його id.'
  // })
  // @ApiBearerAuth()
  // @UseGuards(ApprovedRoleGuard)
  // @Role(RoleTypeEnum.ADMIN)
  // @Get(':userId')
  // public async findOne(
  //   @Param('userId', ParseUUIDPipe) userId: string,
  //   @Query() query: ListUsersQueryReqDto, // Параметри передаються через @Query
  // ): Promise<статистика> {
  //   const [entities, total]  = await this.usersService.findOne(userId, query);
  //    return UserMapper.toAllResDtoListId(entities, total, query);
  // }

  // @ApiOperation({
  //   summary: 'Для видалення облікового запису користувача за його id',
  //   description:
  //     'Admin може видалити обліковий запис іншого користувача по його id ' +
  //     '*в БД в стовбчику deleted буде вказано дату видалення користувача.'
  // })
  // @ApiBearerAuth()
  // @UseGuards(ApprovedRoleGuard)
  // @Role(RoleTypeEnum.ADMIN)
  // @Delete(':userId')
  // public async deleteId(
  //   @Param('userId', ParseUUIDPipe) userId: string,
  // ): Promise<string> {
  //   return await this.usersService.deleteId(userId);
  // }
}

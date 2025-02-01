import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RoleTypeEnum } from './enums/RoleType.enum';
import { Role } from '../guards/decorator/role.decorator';
import { UsersService } from './service/users.service';
import { ApprovedRoleGuard } from '../guards/approved_role.guard';
import { GiveRoleDto } from './models/dto/req/give_role.dto';
import { UserResDto } from './models/dto/res/user.res.dto';
import { UserMapper } from './service/user.mapper';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Для видачі ролей',
    description: 'Користувач з ролю admin може видавати ролі',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role(RoleTypeEnum.ADMIN)
  @Post('role')
  async giveRole(@Body() giveRoleDto: GiveRoleDto): Promise<UserResDto> {
    const result = await this.usersService.giveRole(giveRoleDto);
    return UserMapper.toResDto(result);
  }

  // @ApiOperation({
  //   summary: 'Для отримання інформацію про всі облікові записи користувачів',
  //   description:
  //     'Користувач може отримати інформацію про всі облікові записи користувачів',
  // })
  // @SkipAuth()
  // @Get('all')
  // public async findAll(
  //   @Query() query: ListUsersQueryReqDto, // Параметри передаються через @Query
  // ): Promise<ListResQueryDto> {
  //   const [entities, total] = await this.usersService.findAll(query);
  //   return UserMapper.toAllResDtoList(entities, total, query);
  // }
}

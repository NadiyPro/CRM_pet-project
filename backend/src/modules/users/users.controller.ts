import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RoleTypeEnum } from './enums/RoleType.enum';
import { Role } from '../guards/decorator/role.decorator';
import { IUserData } from '../auth/models/interfaces/user_data.interface';
import { UsersService } from './service/users.service';
import { ApprovedRoleGuard } from '../guards/approved_role.guard';
import { SkipAuth } from '../auth/decorators/skip_auth.decorator';
import { CurrentUser } from '../auth/decorators/current_user.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @ApiOperation({
  //   summary: 'Для видачі ролей',
  //   description: 'Користувач з ролью admin може видавати ролі',
  // })
  // @ApiBearerAuth()
  // @UseGuards(ApprovedRoleGuard)
  // @Role(RoleTypeEnum.ADMIN)
  // @Patch('role/:user_id')
  // async giveRole(
  //   @Param('user_id') user_id: string,
  //   @Body() giveRoleDto: GiveRoleDto,
  //   @CurrentUser() userData: IUserData,
  // ): Promise<UserResDto> {
  //   const result = await this.usersService.giveRole(
  //     user_id,
  //     giveRoleDto.new_role,
  //     userData.role,
  //   );
  //   return UserMapper.toResDto(result);
  // }

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

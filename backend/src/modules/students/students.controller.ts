import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { StudentsService } from './service/students.service';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly usersService: StudentsService) {}

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


}

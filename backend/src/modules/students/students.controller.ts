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

  // @ApiOperation({
  //   summary: 'Для оновлення даних по student',
  //   description:
  //     'Admin / manager може оновити дані по student
  //     (якщо заявка ще не взяти в роботу або знаходиться в роботі у даного admin / manager)' +
  //     '*можна залишати пусті поля',
  // })
  // @ApiBearerAuth()
  // @UseGuards(ApprovedRoleGuard)
  // @Role(RoleTypeEnum.ADMIN, RoleTypeEnum.MANAGER)
  // @Patch(':studentId')
  // public async updateId(
  // @CurrentUser() userData: IUserData,
  // @Param('studentId', ParseUUIDPipe) studentId: string,
  //   @Body() updateUserDto: UpdateUserReqDto,
  // ) {
  //   const result = await this.usersService.updateId(studentId, updateUserDto, userData);
  //   return UserMapper.toResDto(result);
  // }
  // в додати перевірку ,якщо status ==== New або null о можна редагувати або
  // якщо заява знаходиться в роботі у цього ж юзера manager (призвіще та імя)
}

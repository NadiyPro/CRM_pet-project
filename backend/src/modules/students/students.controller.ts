import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, ParseUUIDPipe, Put, Query, UseGuards } from '@nestjs/common';
import { StudentsService } from './service/students.service';
import { ApprovedRoleGuard } from '../guards/approved_role.guard';
import { Role } from '../guards/decorator/role.decorator';
import { RoleTypeEnum } from '../../infrastructure/mySQL/entities/enums/roleType.enum';
import { ListStudentsQueryReqDto } from './models/dto/req/list-students-query.req.dto';
import { ListStudentsResQueryDto } from './models/dto/res/list-students-query.res.dto';
import { StudentsMapper } from './service/students.mapper';
import { CurrentUser } from '../auth/decorators/current_user.decorator';
import { IUserData } from '../auth/models/interfaces/user_data.interface';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // перевіряти статус активний чи ні тут не потрібно,
  // оскільки якщо статус не активно, то юзер просто не зможе зайти в адміну
  @ApiOperation({
    summary: 'Для отримання інформацію про students',
    description: 'Admin / manager може отримати інформацію про students',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role(RoleTypeEnum.ADMIN || RoleTypeEnum.MANAGER)
  @Get()
  public async findAll(
    @Query() query: ListStudentsQueryReqDto, // Параметри передаються через @Query
  ): Promise<ListStudentsResQueryDto> {
    const [entities, total] = await this.studentsService.findAll(query);
    return StudentsMapper.toAllResDtoList(entities, total, query);
  }

  // // в додати перевірку ,якщо status ==== New або null о можна редагувати або
  // // якщо заява знаходиться в роботі у цього ж юзера manager (призвіще та імя)
  // @ApiOperation({
  //   summary: 'Для оновлення даних по student',
  //   description:
  //     'Admin / manager може оновити дані по student' +
  //     '(якщо заявка ще не взяти в роботу або знаходиться в роботі у даного admin / manager)' +
  //     '*можна залишати пусті поля',
  // })
  // @ApiBearerAuth()
  // @UseGuards(ApprovedRoleGuard)
  // @Role(RoleTypeEnum.ADMIN || RoleTypeEnum.MANAGER)
  // @Put(':studentId')
  // public async updateId(
  // @CurrentUser() userData: IUserData,
  // @Param('studentId', ParseUUIDPipe) studentId: string,
  //   @Body() updateUserDto: UpdateUserReqDto,
  // ) {
  //   const result = await this.usersService.updateId(studentId, updateUserDto, userData);
  //   return UserMapper.toResDto(result);
  // }

  // @ApiOperation({
  //   summary: 'Для видалення запису про student за його id',
  //   description:
  //     'Admin може видалити запис про student по його id ' +
  //     '*в БД в стовбчику deleted буде вказано дату видалення користувача.'
  // })
  // @ApiBearerAuth()
  // @UseGuards(ApprovedRoleGuard)
  // @Role(RoleTypeEnum.ADMIN)
  // @Delete(':studentId')
  // public async deleteId(
  //   @Param('studentId', ParseUUIDPipe) studentId: string,
  // ): Promise<string> {
  //   return await this.usersService.deleteId(studentId);
  // }
}

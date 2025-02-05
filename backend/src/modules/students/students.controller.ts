import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './service/students.service';
import { ApprovedRoleGuard } from '../guards/approved_role.guard';
import { Role } from '../guards/decorator/role.decorator';
import { RoleTypeEnum } from '../../infrastructure/mysql/entities/enums/roleType.enum';
import { ListStudentsQueryReqDto } from './models/dto/req/list-students-query.req.dto';
import { ListStudentsResQueryDto } from './models/dto/res/list-students-query.res.dto';
import { StudentsMapper } from './service/students.mapper';
import { CurrentUser } from '../auth/decorators/current_user.decorator';
import { IUserData } from '../auth/models/interfaces/user_data.interface';
import { UpdateStudentReqDto } from './models/dto/req/updateStudent.req.dto';
import { StudentOwnershipGuard } from '../guards/statuseStudents.guard';
import { UpdateStudentResDto } from './models/dto/res/updateStudent.res.dto';
import { OrdersStatisticResDto } from './models/dto/res/ordersStatistic.res.dto';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @ApiOperation({
    summary: 'Для отримання інформацію про всіх students',
    description:
      'Admin / manager може отримати інформацію про всіх students, ' +
      'сортувати ASC / DESC за кожним полем та фільтрувати по кожному полю. ' +
      'Для запиту: limit - кількість елементів на сторінці, page - номер сторінка, ' +
      'search - по кожному з полів можемо виконувати пошук (фільтр),  ' +
      'sortField - по якому полю сортуємо, sortASCOrDESC - сортуємо по зростанню чи спаданню.' +
      'Приклад запиту: GET /students?limit=10&page=2&search=john&sortField=name&sortASCOrDESC=ASC',
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

  @ApiOperation({
    summary: 'Для оновлення даних по student',
    description:
      'Admin / manager може оновити дані по student' +
      '(якщо заявка status ==== New або null або знаходиться в роботі у даного admin / manager)' +
      '*можна залишати пусті поля' +
      '*сортування по замовченню по полю created_at, DESC',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard, StudentOwnershipGuard)
  @Role(RoleTypeEnum.ADMIN || RoleTypeEnum.MANAGER)
  @Put(':studentId')
  public async updateId(
    @CurrentUser() userData: IUserData,
    @Param('studentId', ParseUUIDPipe) studentId: string,
    @Body() updateStudentReqDto: UpdateStudentReqDto,
  ): Promise<UpdateStudentResDto> {
    return await this.studentsService.updateId(
      userData,
      studentId,
      updateStudentReqDto,
    );
  }

  @ApiOperation({
    summary: 'Для фільтрації та сортуванню своїх заявок по студентам',
    description:
      'Для фільтрації та сортуванню своїх заявок по студентам. ' +
      '*сортування по замовченню по полю created_at, DESC',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role(RoleTypeEnum.ADMIN || RoleTypeEnum.MANAGER)
  @Get('myOrder')
  public async findMySOrder(
    @CurrentUser() userData: IUserData,
    @Query() query: ListStudentsQueryReqDto,
  ): Promise<ListStudentsResQueryDto> {
    const [entities, total] = await this.studentsService.findMySOrder(
      userData,
      query,
    );
    return StudentsMapper.toAllResDtoList(entities, total, query);
  }

  @ApiOperation({
    summary: 'Для того, щоб скинути всі фільтри та сортування.',
    description:
      'Для того, щоб скинути всі фільтри та сортування. ' +
      '*сортування по замовченню по полю created_at, DESC',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role(RoleTypeEnum.ADMIN || RoleTypeEnum.MANAGER)
  @Get('resetFilters')
  public async resetFilters(): Promise<ListStudentsResQueryDto> {
    const [entities, total] = await this.studentsService.resetFilters();
    return StudentsMapper.resetFiltersAllResDtoList(entities, total);
  }

  @ApiOperation({
    summary: 'Admin може додати нового student до списку.',
    description: 'Admin може додати нового student до списку',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role(RoleTypeEnum.ADMIN)
  @Post()
  public async createStudent(
    @Body() updateStudentReqDto: UpdateStudentReqDto,
  ): Promise<UpdateStudentResDto> {
    return await this.studentsService.createStudent(updateStudentReqDto);
  }

  @ApiOperation({
    summary: 'Для видалення запису про student за його id',
    description: 'Admin може видалити запис про student по його id ',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role(RoleTypeEnum.ADMIN)
  @Delete(':studentId')
  public async deleteId(
    @Param('studentId', ParseUUIDPipe) studentId: string,
  ): Promise<string> {
    return await this.studentsService.deleteId(studentId);
  }

  @ApiOperation({
    summary:
      'Admin може переглядати статистику по всім заявам в розрізі статусів',
    description:
      'Admin може переглядати статистику по всім заявам в розрізі статусів',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role(RoleTypeEnum.ADMIN)
  @Get('ordersStatisticAll')
  public async ordersStatisticAll(): Promise<OrdersStatisticResDto> {
    return await this.studentsService.ordersStatisticAll();
  }

  @ApiOperation({
    summary:
      'Admin може переглядати статистику по всім заявам в розрізі статусів',
    description:
      'Admin може переглядати статистику по всім заявам в розрізі статусів',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role(RoleTypeEnum.ADMIN)
  @Get('ordersStatisticManager')
  public async ordersStatisticManager(): Promise<OrdersStatisticResDto[]> {
    return await this.studentsService.ordersStatisticManager();
  }
}

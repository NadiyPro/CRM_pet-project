import { Response } from 'express'; // додай це на початку файлу
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './service/orders.service';
import { ApprovedRoleGuard } from '../guards/approvedRole.guard';
import { Role } from '../guards/decorator/role.decorator';
import { RoleTypeEnum } from '../../infrastructure/mysql/entities/enums/roleType.enum';
import { ListOrdersQueryReqDto } from './models/dto/req/listOrdersQuery.req.dto';
import { ListOrdersResQueryDto } from './models/dto/res/listOrdersQuery.res.dto';
import { OrdersMapper } from './service/orders.mapper';
import { CurrentUser } from '../auth/decorators/current_user.decorator';
import { IUserData } from '../auth/models/interfaces/user_data.interface';
import { UpdateOrdersReqDto } from './models/dto/req/updateOrder.req.dto';
import { OrdersGuard } from '../guards/statuseOrders.guard';
import { UpdateOrdersResDto } from './models/dto/res/updateOrders.res.dto';
import { OrdersStatisticResDto } from './models/dto/res/ordersStatistic.res.dto';
import { TableNameEnum } from '../../infrastructure/mysql/entities/enums/tableName.enum';
import { CreateOrdersReqDto } from './models/dto/req/createOrders.req.dto';
import { OrdersStatisticAllResDto } from './models/dto/res/ordersStatisticAll.res.dto';
import { OrdersEntity } from '../../infrastructure/mysql/entities/orders.entity';
import { Workbook } from 'exceljs';
import { ListOrdersExportReqDto } from './models/dto/req/listOrdersExportReqDto.req.dto';

@ApiTags(TableNameEnum.ORDERS)
@Controller(TableNameEnum.ORDERS)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({
    summary: 'Для отримання інформацію про всі orders',
    description:
      'Admin | manager може отримати інформацію про всі orders, ' +
      'сортувати ASC | DESC за кожним полем та фільтрувати по кожному полю (за замовченням DESC)' +
      'Для запиту: limit - кількість елементів на сторінці, page - номер сторінка (за замовченням 25 шт), ' +
      'search - по кожному з полів можемо виконувати пошук (фільтр),  ' +
      'sortField - по якому полю сортуємо, sortASCOrDESC - сортуємо по зростанню чи спаданню.' +
      'Приклад запиту: GET /orders?limit=10&page=2&search=john&sortField=name&sortASCOrDESC=ASC',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role([RoleTypeEnum.ADMIN, RoleTypeEnum.MANAGER])
  @Get()
  public async findAll(
    @CurrentUser() userData: IUserData,
    @Query() query: ListOrdersQueryReqDto,
  ): Promise<ListOrdersResQueryDto> {
    const [entities, total] = await this.ordersService.findAll(userData, query);
    return OrdersMapper.toAllResDtoList(entities, total, query);
  }

  @ApiOperation({
    summary: 'Експорт всіх заявок з урахуванням обраних фільтрів в Excel',
    description: 'Експорт всіх заявок з урахуванням обраних фільтрів в Excel',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role([RoleTypeEnum.ADMIN, RoleTypeEnum.MANAGER])
  @Get('export')
  public async exportOrders(
    @CurrentUser() userData: IUserData,
    @Query() query: ListOrdersExportReqDto,
    @Res() res: Response,
  ) {
    const [orders] = await this.ordersService.findAllExport(userData, query);
    const workbook = new Workbook(); // створює новий порожній Excel
    const worksheet = workbook.addWorksheet('Orders'); // створює нову сторінку в Excel з назвою Orders

    worksheet.addRow([
      'ID',
      'Name',
      'Surname',
      'Email',
      'Phone',
      'Course',
      'Status',
      'Sum',
      'Already Paid',
      'Created At',
      'Manager id',
      'Manager surname',
      'Group id',
      'Group Name',
    ]);

    // worksheet.addRow додає значення в табл Excel
    orders.forEach((order) => {
      worksheet.addRow([
        order.id,
        order.name,
        order.surname,
        order.email,
        order.phone,
        order.course,
        order.status,
        order.sum,
        order.alreadyPaid,
        order.created_at,
        order.manager?.id ?? '',
        order.manager?.surname ?? '',
        order.group_id,
        order.group_name,
      ]);
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ); // вказує, що відповідь буде у форматі Excel (.xlsx)
    res.setHeader('Content-Disposition', 'attachment; filename=orders.xlsx');
    // вказує, що файл повинен бути завантажений під назвою orders.xlsx
    await workbook.xlsx.write(res);
    // записуємо вже заповнений Excel (.xlsx) та передаємо його у res
    res.end(); // віддаємо відповідь клієнту
  }

  @ApiOperation({
    summary: 'Admin може додати новий orders до списку',
    description: 'Admin може додати новий orders до списку',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role([RoleTypeEnum.ADMIN])
  @Post()
  public async createOrder(
    @CurrentUser() userData: IUserData,
    @Body() createOrdersReqDto: CreateOrdersReqDto,
  ): Promise<OrdersEntity> {
    return await this.ordersService.createOrder(userData, createOrdersReqDto);
  }

  // @ApiOperation({
  //   summary: 'Для того, щоб скинути всі фільтри та сортування.',
  //   description:
  //     'Для того, щоб скинути всі фільтри та сортування. ' +
  //     '*сортування по замовченню по полю created_at, DESC',
  // })
  // @ApiBearerAuth()
  // @UseGuards(ApprovedRoleGuard)
  // @Role([RoleTypeEnum.ADMIN, RoleTypeEnum.MANAGER])
  // @Get('resetFilters')
  // public async resetFilters(): Promise<ListOrdersResQueryDto> {
  //   const [entities, total] = await this.ordersService.resetFilters();
  //   return OrdersMapper.resetFiltersAllResDtoList(entities, total);
  // }

  @ApiOperation({
    summary:
      'Admin може переглядати статистику по всім заявам в розрізі статусів',
    description:
      'Admin може переглядати статистику по всім заявам в розрізі статусів',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role([RoleTypeEnum.ADMIN])
  @Get('ordersStatisticAll')
  public async ordersStatisticAll(): Promise<OrdersStatisticAllResDto> {
    return await this.ordersService.ordersStatisticAll();
  }

  @ApiOperation({
    summary:
      'Admin може переглядати статистику по всім заявам в розрізі статусів ' +
      'по конкретному менеджеру (по id менеджера)',
    description:
      'Admin може переглядати статистику по всім заявам в розрізі статусів ' +
      'по конкретному менеджеру (по id менеджера)',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role([RoleTypeEnum.ADMIN])
  @Get('ordersStatisticManager')
  public async ordersStatisticManager(): Promise<OrdersStatisticResDto[]> {
    return await this.ordersService.ordersStatisticManager();
  }

  @ApiOperation({
    summary: 'Для додавання group до order',
    description:
      'Для додавання group до order по group_id ' +
      '*(витягаємо всі групи з таблиці group та обираємо потрібну нам, зберігаємо значення). ',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard, OrdersGuard)
  @Role([RoleTypeEnum.ADMIN, RoleTypeEnum.MANAGER])
  @Post(':orderId/:group_id')
  public async addGroup(
    @Param('orderId', ParseIntPipe) orderId: string,
    @Param('group_id', ParseIntPipe) group_id: string,
  ): Promise<OrdersEntity> {
    const orderNumber = +orderId;
    const group_idNumber = +group_id;
    return await this.ordersService.addGroup(orderNumber, group_idNumber);
  }

  @ApiOperation({
    summary: 'Для оновлення даних по orders',
    description:
      'Manager може оновити дані по orders. ' +
      'При збережені заявки, якщо до цього status === New, або status === null, ' +
      'то буде автоматично змінено status на In_Work та підтягнеться Призвіще менеджера.' +
      '(якщо заявка status ==== New або null або знаходиться в роботі у даного admin | manager)' +
      '*можна залишати пусті поля' +
      '*сортування по замовченню по полю created_at, DESC' +
      "*course може бути: FS, QACX, JCX', JSCX, FE, PCX\n" +
      '*course_format може бути: static, online\n' +
      '*course_type може бути: pro, minimal, premium, incubator, vip\n' +
      '*status може бути: In_work, New, Aggre, Disaggre, Dubbing\n',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard, OrdersGuard)
  @Role([RoleTypeEnum.ADMIN, RoleTypeEnum.MANAGER])
  @Put(':orderId')
  public async updateId(
    @CurrentUser() userData: IUserData,
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() updateOrdersReqDto: UpdateOrdersReqDto,
  ): Promise<UpdateOrdersResDto> {
    return await this.ordersService.updateId(
      userData,
      orderId,
      updateOrdersReqDto,
    );
  }

  @ApiOperation({
    summary: 'Для відображення інформації по order за його id',
    description: 'Для відображення інформації по order за його id',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard, OrdersGuard)
  @Role([RoleTypeEnum.ADMIN, RoleTypeEnum.MANAGER])
  @Get(':orderId')
  public async findOneOrder(
    @Param('orderId', ParseIntPipe) orderId: number,
  ): Promise<UpdateOrdersResDto> {
    return await this.ordersService.findOneOrder(orderId);
  }

  @ApiOperation({
    summary: 'Для видалення запису про order за його id',
    description: 'Admin може видалити запис про order по його id ',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role([RoleTypeEnum.ADMIN])
  @Delete(':orderId')
  public async deleteId(
    @Param('orderId', ParseIntPipe) orderId: number,
  ): Promise<string> {
    return await this.ordersService.deleteId(orderId);
  }
}

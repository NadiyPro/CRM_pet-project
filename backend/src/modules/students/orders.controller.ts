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
import { OrdersService } from './service/orders.service';
import { ApprovedRoleGuard } from '../guards/approvedRole.guard';
import { Role } from '../guards/decorator/role.decorator';
import { RoleTypeEnum } from '../../infrastructure/mysql/entities/enums/roleType.enum';
import { ListOrdersQueryReqDto } from './models/dto/req/listOrdersQuery.req.dto';
import { ListOrdersResQueryDto } from './models/dto/res/listStudentsQuery.res.dto';
import { OrdersMapper } from './service/orders.mapper';
import { CurrentUser } from '../auth/decorators/current_user.decorator';
import { IUserData } from '../auth/models/interfaces/user_data.interface';
import { UpdateOrdersReqDto } from './models/dto/req/updateOrder.req.dto';
import { OrdersGuard } from '../guards/statuseOrders.guard';
import { UpdateOrdersResDto } from './models/dto/res/updateOrders.res.dto';
import { OrdersStatisticResDto } from './models/dto/res/ordersStatistic.res.dto';
import { TableNameEnum } from '../../infrastructure/mysql/entities/enums/tableName.enum';

@ApiTags(TableNameEnum.ORDERS)
@Controller(TableNameEnum.ORDERS)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({
    summary: 'Для отримання інформацію про всіх students',
    description:
      'Admin | manager може отримати інформацію про всіх students, ' +
      'сортувати ASC | DESC за кожним полем та фільтрувати по кожному полю. ' +
      'Для запиту: limit - кількість елементів на сторінці, page - номер сторінка, ' +
      'search - по кожному з полів можемо виконувати пошук (фільтр),  ' +
      'sortField - по якому полю сортуємо, sortASCOrDESC - сортуємо по зростанню чи спаданню.' +
      'Приклад запиту: GET /orders?limit=10&page=2&search=john&sortField=name&sortASCOrDESC=ASC',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role(RoleTypeEnum.ADMIN || RoleTypeEnum.MANAGER)
  @Get()
  public async findAll(
    @Query() query: ListOrdersQueryReqDto, // Параметри передаються через @Query
  ): Promise<ListOrdersResQueryDto> {
    const [entities, total] = await this.ordersService.findAll(query);
    return OrdersMapper.toAllResDtoList(entities, total, query);
  }

  @ApiOperation({
    summary: 'Для оновлення даних по student',
    description:
      'Manager може оновити дані по student. ' +
      'При збережені заявки, якщо до цього status === New, або status === null, ' +
      'то буде автоматично змінено status на In_Work та підтягнеться Призвіще менеджера.' +
      '(якщо заявка status ==== New або null або знаходиться в роботі у даного admin | manager)' +
      '*можна залишати пусті поля' +
      '*сортування по замовченню по полю created_at, DESC',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard, OrdersGuard)
  @Role(RoleTypeEnum.ADMIN || RoleTypeEnum.MANAGER)
  @Put(':orderId')
  public async updateId(
    @CurrentUser() userData: IUserData,
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Body() updateOrdersReqDto: UpdateOrdersReqDto,
  ): Promise<UpdateOrdersResDto> {
    return await this.ordersService.updateId(
      userData,
      orderId,
      updateOrdersReqDto,
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
    @Query() query: ListOrdersQueryReqDto,
  ): Promise<ListOrdersResQueryDto> {
    const [entities, total] = await this.ordersService.findMySOrder(
      userData,
      query,
    );
    return OrdersMapper.toAllResDtoList(entities, total, query);
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
  public async resetFilters(): Promise<ListOrdersResQueryDto> {
    const [entities, total] = await this.ordersService.resetFilters();
    return OrdersMapper.resetFiltersAllResDtoList(entities, total);
  }

  @ApiOperation({
    summary: 'Admin може додати нового student до списку.',
    description: 'Admin може додати нового student до списку',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role(RoleTypeEnum.ADMIN)
  @Post()
  public async createOrder(
    @Body() updateOrdersReqDto: UpdateOrdersReqDto,
  ): Promise<UpdateOrdersResDto> {
    return await this.ordersService.createOrder(updateOrdersReqDto);
  }

  @ApiOperation({
    summary: 'Для видалення запису про student за його id',
    description: 'Admin може видалити запис про student по його id ',
  })
  @ApiBearerAuth()
  @UseGuards(ApprovedRoleGuard)
  @Role(RoleTypeEnum.ADMIN)
  @Delete(':orderId')
  public async deleteId(
    @Param('orderId', ParseUUIDPipe) orderId: string,
  ): Promise<string> {
    return await this.ordersService.deleteId(orderId);
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
    return await this.ordersService.ordersStatisticAll();
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
    return await this.ordersService.ordersStatisticManager();
  }
}

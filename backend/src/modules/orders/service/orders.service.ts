import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrdersRepository } from '../../../infrastructure/repository/services/orders.repository';
import { ListOrdersQueryReqDto } from '../models/dto/req/listOrdersQuery.req.dto';
import { OrdersEntity } from '../../../infrastructure/mysql/entities/orders.entity';
import { IUserData } from '../../auth/models/interfaces/user_data.interface';
import { UserRepository } from '../../../infrastructure/repository/services/user.repository';
import { UpdateOrdersResDto } from '../models/dto/res/updateOrders.res.dto';
import { StatusEnum } from '../../../infrastructure/mysql/entities/enums/status.enum';
import { OrdersStatisticResDto } from '../models/dto/res/ordersStatistic.res.dto';
import { UpdateOrdersReqDto } from '../models/dto/req/updateOrder.req.dto';
import { OrdersMapper } from './orders.mapper';
import { CreateOrdersReqDto } from '../models/dto/req/createOrders.req.dto';
import { OrdersStatisticAllResDto } from '../models/dto/res/ordersStatisticAll.res.dto';
import { GroupRepository } from '../../../infrastructure/repository/services/group.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly userRepository: UserRepository,
    private readonly groupRepository: GroupRepository,
  ) {}

  public async findAll(
    query: ListOrdersQueryReqDto,
  ): Promise<[OrdersEntity[], number]> {
    return await this.ordersRepository.findAll(query);
  }

  public async resetFilters(): Promise<[OrdersEntity[], number]> {
    return await this.ordersRepository.resetFilters();
  }

  public async ordersStatisticAll(): Promise<OrdersStatisticAllResDto> {
    return await this.ordersRepository.ordersStatisticAll();
  }
  public async ordersStatisticManager(): Promise<OrdersStatisticResDto[]> {
    const statisticAll = await this.ordersRepository.ordersStatisticManager();
    return statisticAll.map((item) => ({
      manager: item.manager || null,
      total: Number(item.total) || null,
      In_work: Number(item.In_work) || null,
      New: Number(item.New) || null,
      Aggre: Number(item.Aggre) || null,
      Disaggre: Number(item.Disaggre) || null,
      Dubbing: Number(item.Dubbing) || null,
    }));
  }

  public async findMyOrder(
    userData: IUserData,
    query: ListOrdersQueryReqDto,
  ): Promise<[OrdersEntity[], number]> {
    return await this.ordersRepository.findMyOrder(userData, query);
  }

  public async createOrder(
    userData: IUserData,
    createOrdersReqDto: CreateOrdersReqDto,
  ): Promise<OrdersEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userData.userId },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const order = this.ordersRepository.create({
      ...createOrdersReqDto,
      manager: user,
    });
    await this.ordersRepository.save(order);
    return await this.ordersRepository.findOne({
      where: { id: order.id },
      relations: ['manager'],
    });
  }

  public async addGroup(
    orderNumber: number,
    group_idNumber: number,
  ): Promise<OrdersEntity> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderNumber },
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${orderNumber} not found`);
    }

    const group = await this.groupRepository.findOne({
      where: { id: group_idNumber },
    });
    if (!group) {
      throw new NotFoundException(`Group with id ${group_idNumber} not found`);
    }
    if (order.group_id !== group.id) {
      order.group_id = group.id;
      order.group_name = group.group_name;
    }
    await this.ordersRepository.save(order);
    return await this.ordersRepository.findOne({
      where: { id: order.id },
      relations: ['manager'],
    });
  }

  public async updateId(
    userData: IUserData,
    orderId: number,
    updateOrdersReqDto: UpdateOrdersReqDto,
  ): Promise<UpdateOrdersResDto> {
    const user = await this.userRepository.findOne({
      where: { id: userData.userId },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['manager'],
    });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    if (order.status !== StatusEnum.NEW && order.status !== null) {
      await this.ordersRepository.update(orderId, {
        ...updateOrdersReqDto,
        manager: user,
      });
    } else {
      await this.ordersRepository.update(orderId, {
        ...updateOrdersReqDto,
        manager: user,
        status: StatusEnum.IN_WORK,
      });
    }

    const updatedOrder = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['manager', 'messages'],
    });
    if (!updatedOrder) {
      throw new HttpException(
        'Failed to update order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return OrdersMapper.toUpdatedOrderResDto(updatedOrder);
  }

  public async findOneOrder(orderId: number): Promise<UpdateOrdersResDto> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['manager', 'messages'],
    });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return OrdersMapper.toUpdatedOrderResDto(order);
  }

  public async deleteId(orderId: number): Promise<string> {
    await this.ordersRepository.delete({ id: orderId });
    return 'The user in the table (db) was successfully deleted';
  }
}

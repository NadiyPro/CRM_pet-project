import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async findAll(
    query: ListOrdersQueryReqDto,
  ): Promise<[OrdersEntity[], number]> {
    return await this.ordersRepository.findAll(query);
  }

  public async createOrder(
    userData: IUserData,
    updateOrdersReqDto: UpdateOrdersReqDto,
  ): Promise<UpdateOrdersResDto> {
    const user = await this.userRepository.findOne({
      where: { id: userData.userId },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const order = this.ordersRepository.create({
      ...updateOrdersReqDto,
      manager: user,
    });
    await this.ordersRepository.save(order);
    return await this.ordersRepository.findOne({
      where: { id: order.id },
      // relations: ['manager'], // Додаємо `manager`
    });
  }

  // public async updateId(
  //   userData: IUserData,
  //   orderId: number,
  //   updateOrdersReqDto: UpdateOrdersReqDto,
  // ): Promise<UpdateOrdersResDto> {
  //   const user = await this.userRepository.findOne({
  //     where: { id: userData.userId },
  //   });
  //   if (!user) {
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   }
  //
  //   const order = await this.ordersRepository.findOne({
  //     where: { id: orderId },
  //   });
  //
  //   if (order.status === StatusEnum.NEW || order.status === null) {
  //     await this.ordersRepository.update(orderId, {
  //       ...updateOrdersReqDto,
  //       manager: user,
  //       status: StatusEnum.IN_WORK,
  //     });
  //   }
  //
  //   const updatedOrder = await this.ordersRepository.findOne({
  //     where: { id: orderId },
  //     // relations: ['manager'], // Завантаження `manager`
  //   });
  //
  //   if (!updatedOrder) {
  //     throw new HttpException(
  //       'Failed to update order',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  //
  //   return OrdersMapper.toUpdatedOrderResDto(updatedOrder);
  // }
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
      relations: ['manager'], // Завантажуємо `manager`
    });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    if (order.status === StatusEnum.NEW || order.status === null) {
      await this.ordersRepository.update(orderId, {
        ...updateOrdersReqDto,
        manager: user,
        status: StatusEnum.IN_WORK,
      });
    }

    const updatedOrder = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: ['manager'], // Додаємо `manager`
    });

    if (!updatedOrder) {
      throw new HttpException(
        'Failed to update order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return OrdersMapper.toUpdatedOrderResDto(updatedOrder);
  }

  public async findMySOrder(
    userData: IUserData,
    query: ListOrdersQueryReqDto,
  ): Promise<[OrdersEntity[], number]> {
    return await this.ordersRepository.findMySOrder(userData, query);
  }

  public async resetFilters(): Promise<[OrdersEntity[], number]> {
    return await this.ordersRepository.resetFilters();
  }

  public async deleteId(orderId: number): Promise<string> {
    await this.ordersRepository.delete({ id: orderId });
    return 'The user in the table (db) was successfully deleted';
  }

  public async ordersStatisticAll(): Promise<OrdersStatisticResDto> {
    return await this.ordersRepository.ordersStatisticAll();
  }

  public async ordersStatisticManager(): Promise<OrdersStatisticResDto[]> {
    const statisticAll = await this.ordersRepository.ordersStatisticManager();
    return statisticAll.map((item) => ({
      manager: item.manager,
      total: Number(item.total) || null,
      In_work: Number(item.In_work) || null,
      New: Number(item.New) || null,
      Aggre: Number(item.Aggre) || null,
      Disaggre: Number(item.Disaggre) || null,
      Dubbing: Number(item.Dubbing) || null,
    }));
  }
}

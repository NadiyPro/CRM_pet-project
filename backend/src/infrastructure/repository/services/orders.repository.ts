import { Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { OrdersEntity } from '../../mysql/entities/orders.entity';
import { ListOrdersQueryReqDto } from '../../../modules/orders/models/dto/req/listOrdersQuery.req.dto';
import { IUserData } from '../../../modules/auth/models/interfaces/user_data.interface';
import { OrdersStatisticResDto } from '../../../modules/orders/models/dto/res/ordersStatistic.res.dto';

@Injectable()
export class OrdersRepository extends Repository<OrdersEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(OrdersEntity, dataSource.manager);
  }
  public async findAll(
    query: ListOrdersQueryReqDto,
  ): Promise<[OrdersEntity[], number]> {
    const qb: SelectQueryBuilder<OrdersEntity> = this.createQueryBuilder(
      'orders',
    )
      .leftJoin('orders.manager', 'manager')
      .leftJoin('orders.group', 'groupOrders')
      .leftJoinAndSelect('orders.messages', 'messages')
      .addSelect('manager.surname', 'manager')
      .addSelect('groupOrders.group', 'group_name');

    if (query.search) {
      qb.andWhere(
        `(
         orders.id LIKE :search OR
          orders.name LIKE :search OR
          orders.surname LIKE :search OR
          orders.email LIKE :search OR
          orders.phone LIKE :search OR
          CAST(orders.age AS CHAR) LIKE :search OR
          orders.course LIKE :search OR
          orders.course_format LIKE :search OR
          orders.course_type LIKE :search OR
          orders.status LIKE :search OR
          CAST(orders.sum AS CHAR) LIKE :search OR
          CAST(orders.alreadyPaid AS CHAR) LIKE :search 
          OR manager LIKE :search OR group_name LIKE :search
        )`,
        { search: `%${query.search}%` },
      );
    }

    if (query.sortField && query.sortASCOrDESC) {
      const allowedColumns = [
        'id',
        'name',
        'surname',
        'email',
        'phone',
        'age',
        'course',
        'course_format',
        'course_type',
        'status',
        'sum',
        'alreadyPaid',
        'created_at',
        'manager',
        'group_name',
      ];
      // const column = allowedColumns.includes(query.sortField)
      //   ? `orders.${query.sortField}`
      //   : 'orders.created_at';
      const column =
        query.sortField === 'manager'
          ? 'manager'
          : query.sortField === 'group_name'
            ? 'group_name'
            : allowedColumns.includes(query.sortField)
              ? `orders.${query.sortField}`
              : 'orders.created_at';

      const order =
        query.sortASCOrDESC.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
      qb.orderBy(column, order);
    } else {
      qb.orderBy('orders.created_at', 'DESC');
    }

    const limit = query.limit || 25;
    const page = query.page || 1;

    qb.take(query.limit);
    qb.skip((page - 1) * limit);

    return await qb.getManyAndCount();
  }

  public async findMySOrder(
    userData: IUserData,
    query: ListOrdersQueryReqDto,
  ): Promise<[OrdersEntity[], number]> {
    const qb: SelectQueryBuilder<OrdersEntity> = this.createQueryBuilder(
      'orders',
    )
      .leftJoinAndSelect('orders.manager', 'manager')
      .andWhere('manager.id = :userId', { userId: userData.userId })
      .leftJoinAndSelect('orders.group', 'group')
      .leftJoinAndSelect('orders.messages', 'messages');

    if (query.search) {
      qb.andWhere(
        `(
         orders.id LIKE :search OR
          orders.name LIKE :search OR
          orders.surname LIKE :search OR
          orders.email LIKE :search OR
          orders.phone LIKE :search OR
          CAST(orders.age AS CHAR) LIKE :search OR
          orders.course LIKE :search OR
          orders.course_format LIKE :search OR
          orders.course_type LIKE :search OR
          orders.status LIKE :search OR
          CAST(orders.sum AS CHAR) LIKE :search OR
          CAST(orders.alreadyPaid AS CHAR) LIKE :search OR
          manager.surname LIKE :search OR group.group LIKE :search
        )`,
        { search: `%${query.search}%` },
      );
    }

    if (query.sortField && query.sortASCOrDESC) {
      const allowedColumns = [
        'id',
        'name',
        'surname',
        'email',
        'phone',
        'age',
        'course',
        'course_format',
        'course_type',
        'status',
        'sum',
        'alreadyPaid',
        'created_at',
        'managerId',
        'manager.surname',
        'group.group',
      ];

      const column =
        query.sortField === 'manager.surname'
          ? 'manager.surname'
          : query.sortField === 'group.group'
            ? 'group.group'
            : allowedColumns.includes(query.sortField)
              ? `orders.${query.sortField}`
              : 'orders.created_at';

      const order =
        query.sortASCOrDESC.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
      qb.orderBy(column, order);

      const limit = query.limit || 25;
      const page = query.page || 1;

      qb.take(query.limit);
      qb.skip((page - 1) * limit);

      return await qb.getManyAndCount();
    }
  }

  public async resetFilters(): Promise<[OrdersEntity[], number]> {
    return await this.createQueryBuilder('orders')
      .leftJoinAndSelect('orders.manager', 'manager')
      .leftJoinAndSelect('orders.group', 'group')
      // .addSelect(['manager.surname', 'group.group'])
      .addOrderBy('orders.created_at', 'DESC')
      .getManyAndCount();
  }

  public async ordersStatisticAll(): Promise<OrdersStatisticResDto> {
    return await this.createQueryBuilder('orders')
      .select([
        'COUNT(orders.id) as total',
        'COUNT(CASE WHEN orders.status = "In work" THEN orders.id END) as In_work',
        'COUNT(CASE WHEN orders.status = "New" THEN orders.id END) as New',
        'COUNT(CASE WHEN orders.status = "Aggre" THEN orders.id END) as Aggre',
        'COUNT(CASE WHEN orders.status = "Disaggre" THEN orders.id END) as Disaggre',
        'COUNT(CASE WHEN orders.status = "Dubbing" THEN orders.id END) as Dubbing',
      ])
      .getRawOne();
  }

  public async ordersStatisticManager(): Promise<OrdersStatisticResDto[]> {
    return await this.createQueryBuilder('orders')
      .leftJoin('orders.manager', 'manager')
      .select([
        'manager.id',
        'manager.surname',
        'COUNT(orders.id) as total',
        'COUNT(CASE WHEN orders.status = "In work" THEN orders.id END) as In_work',
        'COUNT(CASE WHEN orders.status = "New" THEN orders.id END) as New',
        'COUNT(CASE WHEN orders.status = "Aggre" THEN orders.id END) as Aggre',
        'COUNT(CASE WHEN orders.status = "Disaggre" THEN orders.id END) as Disaggre',
        'COUNT(CASE WHEN orders.status = "Dubbing" THEN orders.id END) as Dubbing',
      ])
      .groupBy('orders.manager.id')
      .getRawMany();
  }
}

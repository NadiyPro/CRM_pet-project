import { Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { OrdersEntity } from '../../mysql/entities/orders.entity';
import { ListOrdersQueryReqDto } from '../../../modules/orders/models/dto/req/listOrdersQuery.req.dto';
import { IUserData } from '../../../modules/auth/models/interfaces/user_data.interface';
import { OrdersStatisticResDto } from '../../../modules/orders/models/dto/res/ordersStatistic.res.dto';
import { OrdersStatisticAllResDto } from '../../../modules/orders/models/dto/res/ordersStatisticAll.res.dto';
import { SortFieldEnum } from '../../../modules/enums/sortField.enum';
import { ListOrdersExportReqDto } from '../../../modules/orders/models/dto/req/listOrdersExportReqDto.req.dto';

@Injectable()
export class OrdersRepository extends Repository<OrdersEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(OrdersEntity, dataSource.manager);
  }

  public async findAll(
    userData: IUserData,
    query: ListOrdersQueryReqDto,
  ): Promise<[OrdersEntity[], number]> {
    const qb: SelectQueryBuilder<OrdersEntity> = this.createQueryBuilder(
      'orders',
    )
      .leftJoinAndSelect('orders.manager', 'manager')
      .leftJoinAndSelect('orders.messages', 'messages');

    if (query.me) {
      qb.andWhere('manager.id = :userId', { userId: userData.userId });
    }

    const allowedFields = Object.keys(query) as (keyof ListOrdersQueryReqDto)[];
    const excludedFields = [
      'limit',
      'page',
      'sortField',
      'sortASCOrDESC',
      'me',
    ];

    const numericFields: (keyof ListOrdersQueryReqDto)[] = [
      'age',
      'sum',
      'alreadyPaid',
    ];

    for (const key of allowedFields) {
      if (excludedFields.includes(key)) continue;

      const value = query[key];
      if (value === null || value === undefined || value === '') continue;

      const param = `search_${key}`;
      const field = key === 'manager' ? 'manager.surname' : `orders.${key}`;

      if (numericFields.includes(key)) {
        qb.andWhere(`${field} = :${param}`, { [param]: value });
      } else {
        qb.andWhere(`${field} LIKE :${param}`, { [param]: `%${value}%` });
      }
    }

    if (query.sortField && query.sortASCOrDESC) {
      const column =
        query.sortField === SortFieldEnum.MANAGER
          ? 'manager.surname'
          : `orders.${query.sortField}`;

      const order =
        query.sortASCOrDESC.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

      qb.orderBy(column, order);
    } else {
      qb.orderBy('orders.created_at', 'DESC');
    }

    const limit = query.limit || 25;
    const page = query.page || 1;

    qb.take(limit);
    qb.skip((page - 1) * limit);

    return await qb.getManyAndCount();
  }

  public async findAllExport(
    userData: IUserData,
    query: ListOrdersExportReqDto,
  ): Promise<[OrdersEntity[], number]> {
    const qbExport: SelectQueryBuilder<OrdersEntity> = this.createQueryBuilder(
      'orders',
    )
      .leftJoinAndSelect('orders.manager', 'manager')
      // доступаюсь до колонки та кажу що буду працювати з таблицею підвязаною до цієї колонки
      .leftJoinAndSelect('orders.messages', 'messages');

    if (query.me) {
      qbExport.andWhere('manager.id = :userId', { userId: userData.userId });
    }

    const allowedFields = Object.keys(
      query,
    ) as (keyof ListOrdersExportReqDto)[];
    const excludedFields = [
      'limit',
      'page',
      'sortField',
      'sortASCOrDESC',
      'me',
    ];

    const numericFields: (keyof ListOrdersExportReqDto)[] = [
      'age',
      'sum',
      'alreadyPaid',
    ];

    for (const key of allowedFields) {
      if (excludedFields.includes(key)) continue;

      const value = query[key];
      if (value === null || value === undefined || value === '') continue;

      const param = `search_${key}`;
      const field = key === 'manager' ? 'manager.surname' : `orders.${key}`;

      if (numericFields.includes(key)) {
        qbExport.andWhere(`${field} = :${param}`, { [param]: value });
      } else {
        qbExport.andWhere(`${field} LIKE :${param}`, { [param]: `%${value}%` });
      }
    }

    if (query.sortField && query.sortASCOrDESC) {
      const column =
        query.sortField === SortFieldEnum.MANAGER
          ? 'manager.surname'
          : `orders.${query.sortField}`;

      const order =
        query.sortASCOrDESC.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

      qbExport.orderBy(column, order);
    } else {
      qbExport.orderBy('orders.created_at', 'DESC');
    }

    return await qbExport.getManyAndCount();
  }

  public async ordersStatisticAll(): Promise<OrdersStatisticAllResDto> {
    return await this.createQueryBuilder('orders')
      .select([
        'COUNT(orders.id) as total',
        "COUNT(CASE WHEN LOWER(TRIM(orders.status)) = 'in_work' THEN orders.id END) as In_work",
        "COUNT(CASE WHEN LOWER(TRIM(orders.status)) = 'new' THEN orders.id END) as New",
        "COUNT(CASE WHEN LOWER(TRIM(orders.status)) = 'aggre' THEN orders.id END) as Aggre",
        "COUNT(CASE WHEN LOWER(TRIM(orders.status)) = 'disaggre' THEN orders.id END) as Disaggre",
        "COUNT(CASE WHEN LOWER(TRIM(orders.status)) = 'dubbing' THEN orders.id END) as Dubbing",
        "COUNT(CASE WHEN orders.status IS NULL OR orders.status = '' THEN orders.id END) as No_status",
      ])
      .getRawOne();
  }

  public async ordersStatisticManager(
    managerId: string,
  ): Promise<OrdersStatisticResDto> {
    return await this.createQueryBuilder('orders')
      .leftJoin('orders.manager', 'manager')
      .andWhere('manager.id = :userId', { userId: managerId })
      .select([
        'manager.id AS manager',
        'COUNT(orders.id) as total',
        "COUNT(CASE WHEN LOWER(TRIM(orders.status)) = 'in_work' THEN orders.id END) as In_work",
        "COUNT(CASE WHEN LOWER(TRIM(orders.status)) = 'new' THEN orders.id END) as New",
        "COUNT(CASE WHEN LOWER(TRIM(orders.status)) = 'aggre' THEN orders.id END) as Aggre",
        "COUNT(CASE WHEN LOWER(TRIM(orders.status)) = 'disaggre' THEN orders.id END) as Disaggre",
        "COUNT(CASE WHEN LOWER(TRIM(orders.status)) = 'dubbing' THEN orders.id END) as Dubbing",
        "COUNT(CASE WHEN orders.status IS NULL OR orders.status = '' THEN orders.id END) as No_status",
      ])
      .groupBy('manager.id')
      .getRawOne();
  }
}

import { Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { OrdersEntity } from '../../mysql/entities/orders.entity';
import { ListOrdersQueryReqDto } from '../../../modules/orders/models/dto/req/listOrdersQuery.req.dto';
import { IUserData } from '../../../modules/auth/models/interfaces/user_data.interface';
import { OrdersStatisticResDto } from '../../../modules/orders/models/dto/res/ordersStatistic.res.dto';
import { OrdersStatisticAllResDto } from '../../../modules/orders/models/dto/res/ordersStatisticAll.res.dto';
import { SortFieldEnum } from '../../../modules/orders/enums/sortField.enum';
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
      // доступаюсь до колонки та кажу що буду працювати з таблицею підвязаною до цієї колонки
      .leftJoinAndSelect('orders.messages', 'messages');

    if (query.me) {
      qb.andWhere('manager.id = :userId', { userId: userData.userId });
    }

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
          orders.group_id LIKE :search OR
          orders.group_name LIKE :search OR
          manager.surname LIKE :search
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
        'group_id',
        'group_name',
        'manager',
      ];
      const column =
        query.sortField === SortFieldEnum.MANAGER
          ? 'manager.surname'
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

    if (query.search) {
      qbExport.andWhere(
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
          orders.group_id LIKE :search OR
          orders.group_name LIKE :search OR
          manager.surname LIKE :search
        )`,
        { search: `%${query.search}%` },
      );
    }

    if (query.sortField && query.sortASCOrDESC) {
      const allowedColumnsExport = [
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
        'group_id',
        'group_name',
        'manager',
      ];
      const column =
        query.sortField === SortFieldEnum.MANAGER
          ? 'manager.surname'
          : allowedColumnsExport.includes(query.sortField)
            ? `orders.${query.sortField}`
            : 'orders.created_at';

      const order =
        query.sortASCOrDESC.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
      qbExport.orderBy(column, order);
    } else {
      qbExport.orderBy('orders.created_at', 'DESC');
    }
    return await qbExport.getManyAndCount();
  }

  public async resetFilters(): Promise<[OrdersEntity[], number]> {
    return await this.createQueryBuilder('orders')
      .leftJoinAndSelect('orders.manager', 'manager')
      .leftJoinAndSelect('orders.messages', 'messages')
      .addOrderBy('orders.created_at', 'DESC')
      .getManyAndCount();
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

  public async ordersStatisticManager(): Promise<OrdersStatisticResDto[]> {
    return await this.createQueryBuilder('orders')
      .leftJoin('orders.manager', 'manager')
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
      .groupBy('manager.id, manager.surname')
      .getRawMany();
  }
}

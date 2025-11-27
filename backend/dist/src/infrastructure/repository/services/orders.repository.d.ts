import { DataSource, Repository } from 'typeorm';
import { OrdersEntity } from '../../mysql/entities/orders.entity';
import { ListOrdersQueryReqDto } from '../../../modules/orders/models/dto/req/listOrdersQuery.req.dto';
import { IUserData } from '../../../modules/auth/models/interfaces/user_data.interface';
import { OrdersStatisticResDto } from '../../../modules/orders/models/dto/res/ordersStatistic.res.dto';
import { OrdersStatisticAllResDto } from '../../../modules/orders/models/dto/res/ordersStatisticAll.res.dto';
import { ListOrdersExportReqDto } from '../../../modules/orders/models/dto/req/listOrdersExportReqDto.req.dto';
export declare class OrdersRepository extends Repository<OrdersEntity> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    findAll(userData: IUserData, query: ListOrdersQueryReqDto): Promise<[OrdersEntity[], number]>;
    findAllExport(userData: IUserData, query: ListOrdersExportReqDto): Promise<[OrdersEntity[], number]>;
    ordersStatisticAll(): Promise<OrdersStatisticAllResDto>;
    ordersStatisticManager(): Promise<OrdersStatisticResDto[]>;
}

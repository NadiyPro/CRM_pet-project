import { Response } from 'express';
import { OrdersService } from './service/orders.service';
import { ListOrdersQueryReqDto } from './models/dto/req/listOrdersQuery.req.dto';
import { ListOrdersResQueryDto } from './models/dto/res/listOrdersQuery.res.dto';
import { IUserData } from '../auth/models/interfaces/user_data.interface';
import { UpdateOrdersReqDto } from './models/dto/req/updateOrder.req.dto';
import { UpdateOrdersResDto } from './models/dto/res/updateOrders.res.dto';
import { OrdersStatisticResDto } from './models/dto/res/ordersStatistic.res.dto';
import { CreateOrdersReqDto } from './models/dto/req/createOrders.req.dto';
import { OrdersStatisticAllResDto } from './models/dto/res/ordersStatisticAll.res.dto';
import { OrdersEntity } from '../../infrastructure/mysql/entities/orders.entity';
import { ListOrdersExportReqDto } from './models/dto/req/listOrdersExportReqDto.req.dto';
import { BaseOrdersResDto } from './models/dto/res/baseOrders.res.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    findAll(userData: IUserData, query: ListOrdersQueryReqDto): Promise<ListOrdersResQueryDto>;
    exportOrders(userData: IUserData, query: ListOrdersExportReqDto, res: Response): Promise<void>;
    createOrder(userData: IUserData, createOrdersReqDto: CreateOrdersReqDto): Promise<OrdersEntity>;
    ordersStatisticAll(userData: IUserData): Promise<OrdersStatisticAllResDto>;
    ordersStatisticManager(): Promise<OrdersStatisticResDto[]>;
    addGroup(userData: IUserData, orderId: string, group_id: string): Promise<OrdersEntity>;
    updateId(userData: IUserData, orderId: number, updateOrdersReqDto: UpdateOrdersReqDto): Promise<UpdateOrdersResDto>;
    findOneOrder(userData: IUserData, orderId: number): Promise<BaseOrdersResDto>;
    deleteId(orderId: number): Promise<string>;
}

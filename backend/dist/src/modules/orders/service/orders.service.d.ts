import { OrdersRepository } from '../../../infrastructure/repository/services/orders.repository';
import { ListOrdersQueryReqDto } from '../models/dto/req/listOrdersQuery.req.dto';
import { OrdersEntity } from '../../../infrastructure/mysql/entities/orders.entity';
import { IUserData } from '../../auth/models/interfaces/user_data.interface';
import { UserRepository } from '../../../infrastructure/repository/services/user.repository';
import { UpdateOrdersResDto } from '../models/dto/res/updateOrders.res.dto';
import { OrdersStatisticResDto } from '../models/dto/res/ordersStatistic.res.dto';
import { UpdateOrdersReqDto } from '../models/dto/req/updateOrder.req.dto';
import { CreateOrdersReqDto } from '../models/dto/req/createOrders.req.dto';
import { OrdersStatisticAllResDto } from '../models/dto/res/ordersStatisticAll.res.dto';
import { GroupRepository } from '../../../infrastructure/repository/services/group.repository';
import { ListOrdersExportReqDto } from '../models/dto/req/listOrdersExportReqDto.req.dto';
import { BaseOrdersResDto } from '../models/dto/res/baseOrders.res.dto';
export declare class OrdersService {
    private readonly ordersRepository;
    private readonly userRepository;
    private readonly groupRepository;
    constructor(ordersRepository: OrdersRepository, userRepository: UserRepository, groupRepository: GroupRepository);
    findAll(userData: IUserData, query: ListOrdersQueryReqDto): Promise<[OrdersEntity[], number]>;
    findAllExport(userData: IUserData, query: ListOrdersExportReqDto): Promise<[OrdersEntity[], number]>;
    ordersStatisticAll(userData: IUserData): Promise<OrdersStatisticAllResDto>;
    ordersStatisticManager(): Promise<OrdersStatisticResDto[]>;
    createOrder(userData: IUserData, createOrdersReqDto: CreateOrdersReqDto): Promise<OrdersEntity>;
    addGroup(userData: IUserData, orderNumber: number, group_idNumber: number): Promise<OrdersEntity>;
    updateId(userData: IUserData, orderId: number, updateOrdersReqDto: UpdateOrdersReqDto): Promise<UpdateOrdersResDto>;
    findOneOrder(userData: IUserData, orderId: number): Promise<BaseOrdersResDto>;
    deleteId(orderId: number): Promise<string>;
}

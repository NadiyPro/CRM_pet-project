import { ListUsersQueryReqDto } from '../../users/models/dto/req/listUsersQuery.req.dto';
import { OrdersEntity } from '../../../infrastructure/mysql/entities/orders.entity';
import { BaseOrdersResDto } from '../models/dto/res/baseOrders.res.dto';
import { ListOrdersResQueryDto } from '../models/dto/res/listOrdersQuery.res.dto';
import { UpdateOrdersResDto } from '../models/dto/res/updateOrders.res.dto';
import { UserEntity } from '../../../infrastructure/mysql/entities/user.entity';
import { UserOrderResDto } from '../models/dto/res/userOrder.res.dto';
import { IUserData } from '../../auth/models/interfaces/user_data.interface';
export declare class OrdersMapper {
    static toResDto(order: OrdersEntity, userData: IUserData): BaseOrdersResDto;
    static toAllResDtoList(orders: OrdersEntity[], total: number, query: ListUsersQueryReqDto, userData: IUserData): ListOrdersResQueryDto;
    static toUpdatedOrderResDto(updatedOrder: OrdersEntity, userData: IUserData): UpdateOrdersResDto;
    static toUserOrderResDto(user: UserEntity): UserOrderResDto;
}

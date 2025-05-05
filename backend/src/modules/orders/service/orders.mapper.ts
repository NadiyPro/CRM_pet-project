import { ListUsersQueryReqDto } from '../../users/models/dto/req/listUsersQuery.req.dto';
import { OrdersEntity } from '../../../infrastructure/mysql/entities/orders.entity';
import { BaseOrdersResDto } from '../models/dto/res/baseOrders.res.dto';
import { ListOrdersResQueryDto } from '../models/dto/res/listOrdersQuery.res.dto';
import { UpdateOrdersResDto } from '../models/dto/res/updateOrders.res.dto';

export class OrdersMapper {
  public static toResDto(order: OrdersEntity): BaseOrdersResDto {
    return {
      id: order.id,
      name: order.name,
      surname: order?.surname ?? null,
      email: order.email,
      phone: order.phone,
      age: order.age,
      course: order.course,
      course_format: order.course_format,
      course_type: order.course_type,
      status: order.status,
      sum: order.sum,
      alreadyPaid: order.alreadyPaid,
      created_at: order.created_at,
      updated_at: order.updated_at,
      manager: order.manager?.surname ?? null,
      group_id: order?.group_id ?? null,
      group_name: order?.group_name ?? null,
      messages: order.messages ?? null,
      utm: order.utm ?? null,
      msg: order.msg ?? null,
    };
  }

  public static toAllResDtoList(
    orders: OrdersEntity[],
    total: number,
    query: ListUsersQueryReqDto,
  ): ListOrdersResQueryDto {
    return {
      orders: orders.map((order) => this.toResDto(order)),
      total,
      ...query,
    };
  }

  public static resetFiltersResDto(order: OrdersEntity): BaseOrdersResDto {
    return {
      id: order.id,
      name: order.name,
      surname: order.surname,
      email: order.email,
      phone: order.phone,
      age: order.age,
      course: order.course,
      course_format: order.course_format,
      course_type: order.course_type,
      status: order.status,
      sum: order.sum,
      alreadyPaid: order.alreadyPaid,
      created_at: order.created_at,
      updated_at: order.updated_at,
      manager: order.manager?.surname ?? null,
      group_id: order?.group_id ?? null,
      group_name: order?.group_name ?? null,
      messages: order.messages ?? null,
      utm: order.utm ?? null,
      msg: order.msg ?? null,
    };
  }

  public static resetFiltersAllResDtoList(
    orders: OrdersEntity[],
    total: number,
  ): ListOrdersResQueryDto {
    return {
      orders: orders.map((order) => this.resetFiltersResDto(order)),
      total,
    };
  }

  public static toUpdatedOrderResDto(
    updatedOrder: OrdersEntity,
  ): UpdateOrdersResDto {
    return {
      id: updatedOrder.id,
      name: updatedOrder.name,
      surname: updatedOrder.surname,
      email: updatedOrder.email,
      phone: updatedOrder.phone,
      age: updatedOrder.age,
      course: updatedOrder.course,
      course_format: updatedOrder.course_format,
      course_type: updatedOrder.course_type,
      status: updatedOrder.status,
      sum: updatedOrder.sum,
      alreadyPaid: updatedOrder.alreadyPaid,
      created_at: updatedOrder.created_at,
      updated_at: updatedOrder.updated_at,
      manager: updatedOrder.manager,
      group_id: updatedOrder?.group_id ?? null,
      group_name: updatedOrder?.group_name ?? null,
      messages: updatedOrder.messages ?? null,
      utm: updatedOrder.utm ?? null,
      msg: updatedOrder.msg ?? null,
    };
  }
}

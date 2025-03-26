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
      manager: order.manager?.surname ?? null,
      group: order.group_name?.group_name ?? null,
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

  public static resetFiltersResDto(student: OrdersEntity): BaseOrdersResDto {
    return {
      id: student.id,
      name: student.name,
      surname: student.surname,
      email: student.email,
      phone: student.phone,
      age: student.age,
      course: student.course,
      course_format: student.course_format,
      course_type: student.course_type,
      status: student.status,
      sum: student.sum,
      alreadyPaid: student.alreadyPaid,
      created_at: student.created_at,
      manager: student.manager?.surname ?? null,
      group: student.group_name?.group_name ?? null,
      // manager: student.manager.surname,
      // group: student.group_id.group_name,
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
      manager: updatedOrder.manager,
    };
  }
}

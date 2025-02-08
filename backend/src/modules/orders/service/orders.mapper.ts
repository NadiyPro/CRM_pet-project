import { ListUsersQueryReqDto } from '../../users/models/dto/req/listUsersQuery.req.dto';
import { OrdersEntity } from '../../../infrastructure/mysql/entities/orders.entity';
import { BaseOrdersResDto } from '../models/dto/res/baseOrders.res.dto';
import { ListOrdersResQueryDto } from '../models/dto/res/listOrdersQuery.res.dto';

export class OrdersMapper {
  public static toResDto(order: OrdersEntity): BaseOrdersResDto {
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
      managerId: order.managerId,
      manager: order.manager,
      group: order.group,
      messagesId: order.messagesId.map((item) => item),
      messages: order.messages.map((item) => item),
      deleted: order.deleted,
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
      managerId: student.managerId,
      manager: student.manager,
      group: student.group,
      messagesId: student.messagesId.map((item) => item),
      messages: student.messages.map((item) => item),
      deleted: student.deleted,
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
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersMapper = void 0;
class OrdersMapper {
    static toResDto(order, userData) {
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
            authManager: userData.surname ?? null,
            group_id: order?.group_id ?? null,
            group_name: order?.group_name ?? null,
            messages: order.messages ?? null,
            utm: order.utm ?? null,
            msg: order.msg ?? null,
        };
    }
    static toAllResDtoList(orders, total, query, userData) {
        return {
            orders: orders.map((order) => this.toResDto(order, userData)),
            total,
            ...query,
        };
    }
    static toUpdatedOrderResDto(updatedOrder, userData) {
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
            manager: updatedOrder.manager
                ? this.toUserOrderResDto(updatedOrder.manager)
                : null,
            authManager: userData.surname ?? null,
            group_id: updatedOrder?.group_id ?? null,
            group_name: updatedOrder?.group_name ?? null,
            messages: updatedOrder.messages ?? null,
            utm: updatedOrder.utm ?? null,
            msg: updatedOrder.msg ?? null,
        };
    }
    static toUserOrderResDto(user) {
        return {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
        };
    }
}
exports.OrdersMapper = OrdersMapper;
//# sourceMappingURL=orders.mapper.js.map
import { BaseOrdersReqDto } from './baseOrders.req.dto';
declare const CreateOrdersReqDto_base: import("@nestjs/common").Type<Pick<BaseOrdersReqDto, "name" | "email" | "surname" | "phone" | "age" | "course" | "course_format" | "course_type" | "sum" | "alreadyPaid" | "status">>;
export declare class CreateOrdersReqDto extends CreateOrdersReqDto_base {
}
export {};

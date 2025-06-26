import { UpdateOrdersReqDto } from './updateOrdersReq.dto';

export interface LoadEditOrderDto {
  orderId: number;
  updateOrdersReqDto: UpdateOrdersReqDto
}
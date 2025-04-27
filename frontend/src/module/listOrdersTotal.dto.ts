import { BaseOrdersDto } from './baseOrders.dto';

export interface ListOrdersTotalDto {
  orders: BaseOrdersDto[];
  total: number;
}

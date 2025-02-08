import { ListOrdersQueryReqDto } from '../req/listOrdersQuery.req.dto';
import { BaseOrdersResDto } from './baseOrders.res.dto';

export class ListOrdersResQueryDto extends ListOrdersQueryReqDto {
  orders: BaseOrdersResDto[];
  total: number;
}

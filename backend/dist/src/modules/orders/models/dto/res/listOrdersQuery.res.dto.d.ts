import { ListOrdersQueryReqDto } from '../req/listOrdersQuery.req.dto';
import { BaseOrdersResDto } from './baseOrders.res.dto';
export declare class ListOrdersResQueryDto extends ListOrdersQueryReqDto {
    orders: BaseOrdersResDto[];
    total: number;
}

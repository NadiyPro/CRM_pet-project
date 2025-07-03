import { ListOrdersAllDto } from '../../module/orders_dto/listOrdersAll.dto';
import { BaseOrdersDto } from '../../module/orders_dto/baseOrders.dto';
import { TypeTextDto } from '../../module/typeText.dto';
import { MessageResDto } from '../../module/orders_dto/messageRes.dto';
import { UpdateOrdersResDto } from '../../module/orders_dto/updateOrdersRes.dto';
import { GroupResDto } from '../../module/orders_dto/groupRes.dto';
import { GroupOrdersDto } from '../../module/orders_dto/groupOrders.dto';

export interface OrderSliceInterface {
  dto: Partial<ListOrdersAllDto>;
  data: {
    orders: BaseOrdersDto[];
    total: number;
  };
  dataExel: string;
  findOneOrder: BaseOrdersDto;
  // findOneOrderError: string | null;
  loadingExel: boolean;
  exportSuccess: TypeTextDto | null;
  messagesOrderId: MessageResDto[];
  createMessage: MessageResDto;
  createMessageError: string | null;
  isEditOrder: boolean;
  editOrder: UpdateOrdersResDto,
  createGroup: GroupResDto,
  allGroup: GroupResDto[] | null;
  addGroup: GroupOrdersDto,
  isAddGroupState: boolean;
  isDefaultGroupState: boolean;
  openedMessageOrderId: number | null;
  isCreateGroup: boolean;
  isDuplicate: boolean;
  isGroupOrder: TypeTextDto | null;
  // isGroupOrder: boolean;
  isNoGroup: boolean;
  isUpdateEditOrder: TypeTextDto | null;
}

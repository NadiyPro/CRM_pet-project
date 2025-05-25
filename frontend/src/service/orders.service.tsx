import { retrieveLocalStorage } from './retrieveLocalStorage';
import { axiosInstance } from './auth.service';
import { ListOrdersAllDto } from '../module/listOrdersAll.dto';
import { ListOrdersExelDto } from '../module/listOrdersExel.dto';
import { ListOrdersTotalDto } from '../module/listOrdersTotal.dto';
import { MessageResDto } from '../module/messageRes.dto';
import { CreateMessageDto } from '../module/createMessage.dto';
import { BaseOrdersDto } from '../module/baseOrders.dto';
import { UpdateOrdersReqDto } from '../module/updateOrdersReq.dto';
import { UpdateOrdersResDto } from '../module/updateOrdersRes.dto';
import { Group_nameDto } from '../module/group_name.dto';
import { GroupResDto } from '../module/groupRes.dto';
import { GroupOrdersDto } from '../module/groupOrders.dto';
import { AuthResDto } from '../module/authRes.dto';

axiosInstance.interceptors.request.use(request => {
  if(localStorage.getItem('tokenPair') && request.url !== '/auth' && request.url !== '/auth/refresh')
    request.headers.set('Authorization', 'Bearer ' + retrieveLocalStorage<AuthResDto>('tokenPair').tokens.accessToken);
  return request;
});

const orderService = {
  ordersAll: async (dto: Partial<ListOrdersAllDto>): Promise<ListOrdersTotalDto> => {
    const response = await axiosInstance.get('/orders', { params: dto });
      return response.data;
    },
  ordersExel: async (dto: Partial<ListOrdersExelDto>): Promise<void> => {
    const cleanedParams = Object.fromEntries(
      Object.entries(dto).filter(([, v]) => v !== undefined && v !== null && v !== '')
    );

    const response = await axiosInstance.get('/orders/export', {
      params: cleanedParams,
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'orders.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  },
  findOneOrder: async (orderId: number): Promise<BaseOrdersDto> => {
    const response = await axiosInstance.get(`/orders/${orderId}`);
    return response.data;
  },
  messagesOrderId: async (orderId: number):Promise<MessageResDto[]> => {
    const response = await axiosInstance.get(`/message/${orderId}`);
    return response.data;
  },
  createMessage: async (orderId: number, dataMessage: CreateMessageDto): Promise<MessageResDto> => {
    const response = await axiosInstance.post(`/message/${orderId}`, dataMessage);
    return response.data;
  },
  editOrder: async ( orderId: number, updateOrdersReqDto: UpdateOrdersReqDto): Promise<UpdateOrdersResDto> => {
    console.log("DTO, який відправляється в patch:", updateOrdersReqDto);
    const response = await axiosInstance.patch(`/orders/${orderId}`, updateOrdersReqDto);
    return response.data;
  },
  createGroup: async (group_name: Group_nameDto): Promise<GroupResDto> => {
    const response = await axiosInstance.post('/group', group_name);
    return response.data;
  },
  allGroup: async (): Promise<GroupResDto[] | null> => {
    const response = await axiosInstance.get('/group');
    return response.data;
  },
  addGroup: async (orderId: string, group_id: string): Promise<GroupOrdersDto> => {
    const response = await axiosInstance.post(`/orders/${orderId}/${group_id}`);
    const {
      id,
      group_id: groupId,
      group_name,
    } = response.data;

    return {
      id,
      group_id: groupId,
      group_name,
    };
  }
}

export {
  orderService
}
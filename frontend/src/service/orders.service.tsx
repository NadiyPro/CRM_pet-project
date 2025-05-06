import { retrieveLocalStorage } from './retrieveLocalStorage';
import { AuthTokenDto } from '../module/authToken.dto';
import { axiosInstance } from './auth.service';
import { ListOrdersAllDto } from '../module/listOrdersAll.dto';
import { ListOrdersExelDto } from '../module/listOrdersExel.dto';
import { ListOrdersTotalDto } from '../module/listOrdersTotal.dto';
import { MessageResDto } from '../module/messageRes.dto';
import { CreateMessageDto } from '../module/createMessage.dto';
import { BaseOrdersDto } from '../module/baseOrders.dto';
import { UpdateOrdersReqDto } from '../module/updateOrdersReq.dto';
import { UpdateOrdersResDto } from '../module/updateOrdersRes.dto';

axiosInstance.interceptors.request.use(request => {
  if(localStorage.getItem('tokenPair') && request.url !== '/auth' && request.url !== '/auth/refresh')
    request.headers.set('Authorization', 'Bearer ' + retrieveLocalStorage<AuthTokenDto>('tokenPair').access);
  return request;
});

const orderService = {
  ordersAll: async (dto: ListOrdersAllDto): Promise<ListOrdersTotalDto> => {
    const queryParams = new URLSearchParams();

    queryParams.set('limit', String(dto.limit ?? 25));
    queryParams.set('page', String(dto.page ?? 1));

    if (dto.search && Object.keys(dto.search).length > 0) {
      queryParams.set('search', JSON.stringify(dto.search));
    }

    if (dto.sortField) {
      queryParams.set('sortField', dto.sortField);
    }

    if (dto.sortASCOrDESC) {
      queryParams.set('sortASCOrDESC', dto.sortASCOrDESC);
    }

    if (dto.me !== undefined) {
      queryParams.set('me', String(dto.me));
    }

    const response = await axiosInstance.get(`/orders?${queryParams.toString()}`);
    return response.data;
  },
  ordersExel: async (dto: ListOrdersExelDto): Promise<void> => {
    const response = await axiosInstance.get('/orders/export', {
      params: dto,
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'orders.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url)
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
    const response = await axiosInstance.put(`/orders/${orderId}`, updateOrdersReqDto);
    return response.data;
  }
}

export {
  orderService
}
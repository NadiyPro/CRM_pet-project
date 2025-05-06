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
    const response =
      await axiosInstance.get(
        `/orders?limit=${dto.limit}&page=${dto.page}&id=${dto.id}&name=${dto.name}&surname=${dto.surname}&email=${dto.email}&phone=${dto.phone}&age=${dto.age}&course=${dto.course}&course_format=${dto.course_format}&course_type=${dto.course_type}&status=${dto.status}&sum=${dto.sum}&alreadyPaid=${dto.alreadyPaid}&created_at=${dto.created_at}&manager=${dto.manager}&group_id=${dto.group_id}&group_name=${dto.group_name}&sortField=created_at&sortASCOrDESC=DESC&me=${dto.me}`);
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
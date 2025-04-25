import axios from 'axios';
import { retrieveLocalStorage } from './retrieveLocalStorage';
import { AuthTokenDto } from '../module/authToken.dto';
import { axiosInstance } from './auth.service';
import { ListOrdersAllDto } from '../module/listOrdersAll.dto';
import { BaseOrdersDto } from '../module/baseOrders.dto';

axiosInstance.interceptors.request.use(request => {
  if(localStorage.getItem('tokenPair') && request.url !== '/auth' && request.url !== '/auth/refresh')
    request.headers.set('Authorization', 'Bearer ' + retrieveLocalStorage<AuthTokenDto>('tokenPair').access);
  return request;
});

const orderService = {
  ordersAll: async (dto: ListOrdersAllDto): Promise<BaseOrdersDto> => {
    const response = await axiosInstance.get('/orders', { params: dto })
    return response.data;
  }
}

export {
  orderService
}
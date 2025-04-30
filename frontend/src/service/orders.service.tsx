import { retrieveLocalStorage } from './retrieveLocalStorage';
import { AuthTokenDto } from '../module/authToken.dto';
import { axiosInstance } from './auth.service';
import { ListOrdersAllDto } from '../module/listOrdersAll.dto';
import { ListOrdersExelDto } from '../module/listOrdersExel.dto';
import { ListOrdersTotalDto } from '../module/listOrdersTotal.dto';

axiosInstance.interceptors.request.use(request => {
  if(localStorage.getItem('tokenPair') && request.url !== '/auth' && request.url !== '/auth/refresh')
    request.headers.set('Authorization', 'Bearer ' + retrieveLocalStorage<AuthTokenDto>('tokenPair').access);
  return request;
});

const orderService = {
  ordersAll: async (dto: ListOrdersAllDto): Promise<ListOrdersTotalDto> => {
    const response = await axiosInstance.get('/orders', { params: dto });
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
  }
}

export {
  orderService
}
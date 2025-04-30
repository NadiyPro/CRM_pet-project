import { axiosInstance } from './auth.service';
import { AuthTokenDto } from '../module/authToken.dto';
import { retrieveLocalStorage } from './retrieveLocalStorage';

axiosInstance.interceptors.request.use(request => {
  if(localStorage.getItem('tokenPair') && request.url !== '/auth' && request.url !== '/auth/refresh')
    request.headers.set('Authorization', 'Bearer ' + retrieveLocalStorage<AuthTokenDto>('tokenPair').access)
  return request;
  });

const adminService = {
  ordersStatisticAll: async () => {
    const response = await axiosInstance.get('/orders/ordersStatisticAll');
    return response.data;
  },

}

export {
  adminService
}
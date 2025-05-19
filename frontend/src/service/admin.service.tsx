import { axiosInstance } from './auth.service';
import { retrieveLocalStorage } from './retrieveLocalStorage';
import { OrdersStatisticManagerDto } from '../module/ordersStatisticManager.dto';
import { OrdersStatisticAllDto } from '../module/ordersStatisticAll.dto';
import { ListUsersAllDto } from '../module/listUsersAll.dto';
import { ListUsersQueryDto } from '../module/listUsersQuery.dto';
import { AuthResDto } from '../module/authRes.dto';
import { AuthUserDto } from '../module/authUser.dto';
import { BaseUsersDto } from '../module/baseUsers.dto';
import { GiveRoleDto } from '../module/giveRole.dto';

axiosInstance.interceptors.request.use(request => {
  if(localStorage.getItem('tokenPair') && request.url !== '/auth' && request.url !== '/auth/refresh')
    request.headers.set('Authorization', 'Bearer ' + retrieveLocalStorage<AuthResDto>('tokenPair').tokens.accessToken);
  return request;
});

const adminService = {
  ordersStatisticAll: async (): Promise<OrdersStatisticAllDto> => {
    const response = await axiosInstance.get('/orders/ordersStatisticAll');
    return response.data;
  },
  usersAll: async (dto: ListUsersQueryDto):Promise<ListUsersAllDto> => {
    const response = await axiosInstance.get('/users/all', {params: dto});
    return response.data;
  },
  ordersStatisticManager: async (): Promise<OrdersStatisticManagerDto[]> => {
    const response = await axiosInstance.get('/orders/ordersStatisticManager');
    console.log(response.data)
    return response.data;
  },
  // ordersStatisticManager: async (managerId: string): Promise<OrdersStatisticManagerDto> => {
  //   const response = await axiosInstance.get(`/orders/ordersStatisticManager/${managerId}`);
  //   return response.data;
  // },
  activateUser: async (managerId: string): Promise<AuthResDto> => {
    const response = await axiosInstance.get(`/auth/activate/${managerId}`);
    return response.data;
  },
  banUser: async (managerId: string): Promise<AuthUserDto> => {
    const response = await axiosInstance.put(`/auth/ban/${managerId}`);
    return response.data;
  },
  unbanUser: async (managerId: string): Promise<AuthUserDto> => {
    const response = await axiosInstance.put(`/auth/unban/${managerId}`);
    return response.data;
  },
  giveRole: async (dtoRole:GiveRoleDto): Promise<BaseUsersDto> => {
    const response = await axiosInstance.post('/users/role', dtoRole);
    return response.data;
  }
}

export {
  adminService
}
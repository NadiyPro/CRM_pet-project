import axios from 'axios';
import { retrieveLocalStorage } from './retrieveLocalStorage';
import { AuthTokenDto } from '../module/authToken.dto';
import { AuthLoginDto } from '../module/authLogin.dto';
import { AuthPasswordDto } from '../module/authPassword.dto';

export let axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
});
axiosInstance.interceptors.request.use(request => {
  if(localStorage.getItem('tokenPair') && request.url !== '/auth' && request.url !== '/auth/refresh')
    request.headers.set('Authorization', 'Bearer ' + retrieveLocalStorage<AuthTokenDto>('tokenPair').access);
  return request;
});

const authService = {
  authLogin: async (dto: AuthLoginDto): Promise<boolean> => {
    const response = await axiosInstance.post<AuthTokenDto>('/auth/login', dto);
    localStorage.setItem('tokenPair', JSON.stringify(response.data));
    return !!(response?.data?.access && response?.data?.refresh);
  },
  refresh: async () => {
    const refreshToken = retrieveLocalStorage<AuthTokenDto>('tokenPair').refresh;
    const response = await axiosInstance.post<AuthTokenDto>('/auth/refresh', {refresh:refreshToken})
    localStorage.setItem('tokenPair', JSON.stringify(response.data))
  },
  authLogOut: async (): Promise<boolean> => {
    await axiosInstance.post('/auth/logOut');
    localStorage.removeItem('tokenPair');
    return true;
  },
  activatePassword: async (token: string, authPasswordDto: AuthPasswordDto): Promise<boolean> => {
    const response = await axiosInstance.post<AuthTokenDto>(`/auth/activate/${token}`, authPasswordDto);
    return !!(response?.data?.access && response?.data?.refresh);
}
}

export {
  authService
}
import axios from 'axios';
import { retrieveLocalStorage } from './retrieveLocalStorage';
import { AuthTokenDto } from '../module/authToken.dto';
import { AuthLoginDto } from '../module/authLogin.dto';
import { AuthPasswordDto } from '../module/authPassword.dto';
import { AuthResDto } from '../module/authRes.dto';

export const axiosInstance = axios.create({
  baseURL: '/api',
  // baseURL: 'http://localhost:3000',
  withCredentials: true,
});
axiosInstance.interceptors.request.use(request => {
  if(localStorage.getItem('tokenPair') && request.url !== '/auth' && request.url !== '/auth/refresh' && request.url !== '/auth/activate')
    request.headers.set('Authorization', 'Bearer ' + retrieveLocalStorage<AuthResDto>('tokenPair').tokens.accessToken);
  return request;
});

const authService = {
  authLogin: async (dto: AuthLoginDto): Promise<boolean> => {
    const response = await axiosInstance.post<AuthResDto>('/auth/login', dto);
    localStorage.setItem('tokenPair', JSON.stringify(response.data));
    return !!(response?.data?.tokens.accessToken && response?.data?.tokens.refreshToken);
  },
  refresh: async () => {
    const refreshToken = retrieveLocalStorage<AuthTokenDto>('tokenPair').refreshToken;
    const response = await axiosInstance.post<AuthTokenDto>('/auth/refresh', {refreshToken:refreshToken})
    localStorage.setItem('tokenPair', JSON.stringify(response.data))
  },
  authLogOut: async (): Promise<boolean> => {
    await axiosInstance.post('/auth/logOut');
    localStorage.removeItem('tokenPair');
    return true;
  },
  activatePassword: async (token: string, authPasswordDto: AuthPasswordDto): Promise<boolean> => {
    const response = await axiosInstance.post<AuthResDto>(`/auth/activate/${token}`, authPasswordDto);
    return !!(response?.data?.tokens.accessToken && response?.data?.tokens.refreshToken);
  }
}

export {
  authService
}
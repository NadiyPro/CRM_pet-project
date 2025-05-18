import axios from 'axios';
import { retrieveLocalStorage } from './retrieveLocalStorage';
import { AuthTokenDto } from '../module/authToken.dto';
import { AuthLoginDto } from '../module/authLogin.dto';
import { AuthPasswordDto } from '../module/authPassword.dto';
import { AuthResDto } from '../module/authRes.dto';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});
axiosInstance.interceptors.request.use(request => {
  if(localStorage.getItem('tokenPair') && request.url !== '/auth' && request.url !== '/auth/refresh')
    request.headers.set('Authorization', 'Bearer ' + retrieveLocalStorage<AuthResDto>('tokenPair').tokens.accessToken);
  return request;
});

// axiosInstance.interceptors.request.use(request => {
//   if(localStorage.getItem('tokenPair') && request.url !== '/auth' && request.url !== '/auth/refresh')
//     request.headers.set('Authorization', 'Bearer ' + retrieveLocalStorage<AuthTokenDto>('tokenPair').accessToken);
//   return request;
// });

const authService = {
  authLogin: async (dto: AuthLoginDto): Promise<boolean> => {
    const response = await axiosInstance.post<AuthResDto>('/auth/login', dto);
    localStorage.setItem('tokenPair', JSON.stringify(response.data));
    return !!(response?.data?.tokens.accessToken && response?.data?.tokens.refreshToken);
  },
  // authLogin: async (dto: AuthLoginDto): Promise<boolean> => {
  //   const response = await axiosInstance.post<AuthTokenDto>('/auth/login', dto);
  //   localStorage.setItem('tokenPair', JSON.stringify(response.data));
  //   return !!(response?.data?.access && response?.data?.refresh);
  // },
  // refresh: async () => {
  //   const refreshToken = retrieveLocalStorage<AuthResDto>('tokenPair').tokens.refreshToken;
  //   const response = await axiosInstance.post<AuthResDto>('/auth/refresh', {refreshToken:refreshToken})
  //   localStorage.setItem('tokenPair', JSON.stringify(response.data.tokens))
  // },
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
  activatePassword: async (refreshToken: string, authPasswordDto: AuthPasswordDto): Promise<boolean> => {
    const response = await axiosInstance.post<AuthResDto>(`/auth/activate/${refreshToken}`, authPasswordDto);
    return !!(response?.data?.tokens.accessToken && response?.data?.tokens.refreshToken);
  }
//   activatePassword: async (refreshToken: string, authPasswordDto: AuthPasswordDto): Promise<boolean> => {
//     const response = await axiosInstance.post<AuthTokenDto>(`/auth/activate/${refreshToken}`, authPasswordDto);
//     return !!(response?.data?.accessToken && response?.data?.refreshToken);
// }
}

export {
  authService
}
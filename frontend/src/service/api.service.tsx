import axios from 'axios';
import { retrieveLocalStorage } from './retrieveLocalStorage';
import { AuthTokenModule } from '../module/authTokenModule';
import { AuthLoginModule } from '../module/authLoginModule';

let axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
});
axiosInstance.interceptors.request.use(request => {
  if(localStorage.getItem('tokenPair') && request.url !== '/auth' && request.url !== '/auth/refresh')
    request.headers.set('Authorization', 'Bearer ' + retrieveLocalStorage<AuthTokenModule>('tokenPair').access);
  return request;
});

const authService = {
  authentication: async (dto: AuthLoginModule): Promise<boolean> => {
    const response = await axiosInstance.post<AuthTokenModule>('/auth/login', dto);
    localStorage.setItem('tokenPair', JSON.stringify(response.data));
    return !!(response?.data?.access && response?.data?.refresh);
  },
  refresh: async () => {
    const refreshToken = retrieveLocalStorage<AuthTokenModule>('tokenPair').refresh;
    const response = await axiosInstance.post<AuthTokenModule>('/auth/refresh', {refresh:refreshToken})
    localStorage.setItem('tokenPair', JSON.stringify(response.data))
  },
  authLogOut: async (): Promise<boolean> => {
    await axiosInstance.post('/auth/logOut');
    localStorage.removeItem('tokenPair');
    return true;
  }
}

export {
  authService
}
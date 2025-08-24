import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { retrieveLocalStorage } from './retrieveLocalStorage';
import { AuthTokenDto } from '../module/auth_dto/authToken.dto';
import { AuthLoginDto } from '../module/auth_dto/authLogin.dto';
import { AuthPasswordDto } from '../module/auth_dto/authPassword.dto';
import { AuthResDto } from '../module/auth_dto/authRes.dto';

export const axiosInstance = axios.create({
  baseURL: '/api',
  // baseURL: 'http://localhost:3000',
  withCredentials: true,
});
// axiosInstance.interceptors.request.use(request => {
//   if(localStorage.getItem('tokenPair') && request.url !== '/auth/login' && request.url !== '/auth/refresh' && request.url !== '/auth/activate')
//     request.headers.set('Authorization', 'Bearer ' + retrieveLocalStorage<AuthResDto>('tokenPair').tokens.accessToken);
//   return request;
// });

axiosInstance.interceptors.request.use(request => {
  const pair = retrieveLocalStorage<AuthResDto>('tokenPair');
  if (!pair) return request;

  const url = request.url || '';

  if (!url.includes('/auth/login') && !url.includes('/auth/refresh')) {
    request.headers['Authorization'] = 'Bearer ' + pair.tokens.accessToken;
  }

  if (url.includes('/auth/refresh')) {
    request.headers['Authorization'] = 'Bearer ' + pair.tokens.refreshToken;
    request.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
    request.headers['Pragma'] = 'no-cache';
    request.headers['Expires'] = '0';
  }

  return request;
});

let refreshPromise: Promise<AuthTokenDto> | null = null;
let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError & { config?: AxiosRequestConfig & { _retry?: boolean } }) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !(originalRequest.url?.includes('/auth/refresh'))
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = authService.refresh()
          .then((newTokens) => {
            isRefreshing = false;
            refreshPromise = null; // 🔹 очищаємо
            return newTokens;
          })
          .catch((err) => {
            console.log(err);
            isRefreshing = false;
            refreshPromise = null;
            throw err;
          });
      }

      // тут refreshPromise вже точно не null
      const newTokens = await refreshPromise!;
      originalRequest.headers['Authorization'] = 'Bearer ' + newTokens.accessToken;

      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

const authService = {
  authLogin: async (dto: AuthLoginDto): Promise<boolean> => {
    const response = await axiosInstance.post<AuthResDto>('/auth/login', dto);
    localStorage.setItem('tokenPair', JSON.stringify(response.data));
    return !!(response?.data?.tokens.accessToken && response?.data?.tokens.refreshToken);
  },
  refresh: async () => {
    const current = retrieveLocalStorage<AuthResDto>('tokenPair');
    if (!current) throw new Error("No user found in localStorage during refresh");

    const response = await axiosInstance.post<AuthTokenDto>(
      '/auth/refresh',
      {},
      {

        headers: {
          Authorization: 'Bearer ' + current.tokens.refreshToken,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );

    const newTokens = response.data;
    const newPair: AuthResDto = { user: current.user, tokens: newTokens };
    localStorage.setItem('tokenPair', JSON.stringify(newPair));

    return newPair.tokens;
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
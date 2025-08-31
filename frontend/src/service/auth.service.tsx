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

axiosInstance.interceptors.request.use(request => {
  const pair = retrieveLocalStorage<AuthResDto>('tokenPair');
  if (!pair) return request;

  const url = request.url || '';

  if (!url.includes('/auth/login') && !url.includes('/auth/refresh') && !url.includes('/auth/activate')) {
    request.headers.set('Authorization', 'Bearer ' + pair.tokens.accessToken);
  }

  if (url.includes('/auth/refresh')) {
    request.headers.set('Authorization', 'Bearer ' + pair.tokens.refreshToken);
    request.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    request.headers.set('Pragma', 'no-cache');
    request.headers.set('Expires', '0');
  }

  return request;
});

let refreshPromise: Promise<AuthTokenDto> | null = null;
// зберігається запит на оновлення токену, щоб уникнути дублюючих запитів,
let isRefreshing = false;
// щоб не дублювати запит, а перевіряти чи зараз виконується оновлення токену
// щоб якщо ми в один момент отримаємо 5 різних запитів з помилкою 401,
// щоб вони не викликали оновлення рефрешу 100500 разів,
// а чекали поки оновляться токени по першому запиту

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError & { config?: AxiosRequestConfig & { retry?: boolean } }) => {
    // error.config - оригінальний конфіг запиту, який зберігає axios (урл, метод, хедери, тіло тощо)
    // retry?: boolean - додаю кастомне поле, щоб запити на refresh не були циклічні,
    // якщо refresh токен протерміновано і нам знову видасть 401 то виходимо на /auth/login,
    // а не робимо 100500 циклічних запитів

    const originalRequest = error.config; // зберігаємо оригінальний запит

    // якщо ми йдемо на запит refresh токена і отримуємо там 401 (рефреш токен протермінований) то чистимо локальне сховище і виконуємо редірект на '/auth/login'
    if (originalRequest?.url === '/auth/refresh' && error.response?.status === 401) {
      localStorage.removeItem('tokenPair');
      window.location.href = '/auth/login';
      return Promise.reject(error);
      // тут ми кажемо, що запит закінчився помилкою, щоб axios не сварився
    }

    // якщо ми отимуємо помилку 401 і ця помилка виникає при запиті НЕ на refresh токен, а на інший якийсь запит (наприклад на /orders)
    // то кажемо, що робимо новий запит authService.refresh() на отимання пари токенів
    // потім нновий access токен підставляємо в хедер і виконуємо запит новий
    if (
      error.response?.status === 401 &&
      originalRequest &&
      (originalRequest.url !=='/auth/refresh') &&
      !originalRequest.retry
      // якщо ми ще не виконували запиту з новою парою токенів отриманих від рефреш запиту,
      // щоб не робити нескінченний цикл повторних запитів оки не завершився попередній
    ) {
      originalRequest.retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = authService.refresh() //зберігаємо, ще не завершений асинхронний запит (тобто всі запити на рефреш чекають на результат поточнного рефреш запиту)
          .then((newTokens) => {
            isRefreshing = false;
            refreshPromise = null;
            return newTokens;
          })
          .catch((err) => {
            isRefreshing = false;
            refreshPromise = null;

            // refresh не валідний, чистимо storage і редіректимо
            localStorage.removeItem('tokenPair');
            window.location.href = '/auth/login';

            throw err;
          });
      }

      const newTokens = await refreshPromise!;
      // await ― чекає завершення проміса refreshPromise та "!" кажемо що тут точно не null не undefined
      originalRequest.headers.set('Authorization', 'Bearer ' + newTokens.accessToken);
      // originalRequest.headers['Authorization'] = 'Bearer ' + newTokens.accessToken;

      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
    // якщо інші помилки, то ми їх прокидуємо далі (ловимо 401, інші просто далі прокидуємо)
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

    const response = await axiosInstance.post<AuthTokenDto>(
      '/auth/refresh',
      {},
      {
        headers: {
          Authorization: 'Bearer ' + current.tokens.refreshToken,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          // щоб запит не кешувався і нам не видавало дані по старому токену (відповідь)
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
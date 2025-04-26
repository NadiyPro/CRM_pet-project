import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { authSlice } from './slices/authSlice';
import { orderSlice } from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    authStore: authSlice.reducer,
    orderStore: orderSlice.reducer
  }
});

export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>();
export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
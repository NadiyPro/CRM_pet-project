import { ListOrdersAll } from '../../module/listOrdersAll';
import { createSlice } from '@reduxjs/toolkit';
import { authAction } from './authSlice';
import { loadOrdersAll } from '../reducers/orderLoad/loadOrdersAll';
import { BaseOrdersResDto } from '../../module/baseOrdersResDto';

interface OrderSliceInterface {
  dto:ListOrdersAll;
  total: number;
  orders: BaseOrdersResDto[]
}
const initialState: OrderSliceInterface = {
  total: 0,
  orders: [],
  dto:{
    limit: 25,
    page: 1,
    search: '',
    sortField: null,
    sortASCOrDESC: null,
    me: false,
  }
}

export const orderSlice = createSlice({
  name: 'orderSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        loadOrdersAll.fulfilled,(state, action) => {
          state.orders = action.payload;
    }
      )
  }
})

export const orderAction = {
  ...orderSlice.actions,
  loadOrdersAll
}

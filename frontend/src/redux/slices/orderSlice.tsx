import { createSlice } from '@reduxjs/toolkit';
import { loadOrdersAll } from '../reducers/orderLoad/loadOrdersAll';
import { BaseOrdersDto } from '../../module/baseOrders.dto';
import { ListOrdersAllDto } from '../../module/listOrdersAll.dto';

interface OrderSliceInterface {
  dto:ListOrdersAllDto;
  total: number;
  orders: BaseOrdersDto[]
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
          // state.orders = action.payload;
    }
      )
  }
})

export const orderAction = {
  ...orderSlice.actions,
  loadOrdersAll
}

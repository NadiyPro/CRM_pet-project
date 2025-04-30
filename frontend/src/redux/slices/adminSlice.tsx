import { createSlice } from '@reduxjs/toolkit';
import { loadOrdersStatisticAll } from '../reducers/adminLoad/loadOrdersStatisticAll';
import { OrdersStatisticAllDto } from '../../module/ordersStatisticAll.dto';
import { OrdersStatisticManagerDto } from '../../module/ordersStatisticManager.dto';
import { loadOrdersStatisticManager } from '../reducers/adminLoad/loadOrdersStatisticManager';
import { BaseUsersDto } from '../../module/baseUsers.dto';
import { loadUsersAll } from '../reducers/adminLoad/loadUsersAll';

interface AdminSliceInterface {
  ordersStatisticAll: OrdersStatisticAllDto,
  ordersStatisticManager: OrdersStatisticManagerDto,
  data:{
    users: BaseUsersDto[],
    total: number;
  }
}

const initialState : AdminSliceInterface = {
  ordersStatisticAll: {
    total: null,
    In_work: null,
    New: null,
    Aggre: null,
    Disaggre: null,
    Dubbing: null,
  },
  ordersStatisticManager: {
    manager: null,
    total: null,
    In_work: null,
    New: null,
    Aggre: null,
    Disaggre: null,
    Dubbing: null,
  },
  data:{
    users: [],
    total: 0
  }
};

export const adminSlice = createSlice({
  name: 'adminSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        loadOrdersStatisticAll.fulfilled, (state, action) => {
          state.ordersStatisticAll = action.payload;
        }
      )
      .addCase(
        loadUsersAll.fulfilled, (state, action) => {
          state.data.users = action.payload.users;
          state.data.total = action.payload.total;
        }
      )
      .addCase(
        loadOrdersStatisticManager.fulfilled, (state, action) => {
          state.ordersStatisticManager = action.payload;
        }
      )
  }
})

export const adminAction = {
  ...adminSlice.actions,
  loadOrdersStatisticAll,
  loadUsersAll,
  loadOrdersStatisticManager
}
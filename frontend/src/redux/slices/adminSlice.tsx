import { createSlice } from '@reduxjs/toolkit';
import { loadOrdersStatisticAll } from '../reducers/adminLoad/LoadOrdersStatisticAll';
import { OrdersStatisticAllDto } from '../../module/ordersStatisticAll.dto';
import { OrdersStatisticManagerDto } from '../../module/ordersStatisticManager.dto';
import { loadOrdersStatisticManager } from '../reducers/adminLoad/LoadOrdersStatisticManager';

interface AdminSliceInterface {
  ordersStatisticAll: OrdersStatisticAllDto,
  ordersStatisticManager: OrdersStatisticManagerDto
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
        loadOrdersStatisticManager.fulfilled, (state, action) => {
          state.ordersStatisticManager = action.payload;
        }
      )
  }
})

export const adminAction = {
  ...adminSlice.actions,
  loadOrdersStatisticAll,
  loadOrdersStatisticManager
}
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ListOrdersAll } from '../../../module/listOrdersAll';
import { AxiosError } from 'axios';

const loadOrdersAll = createAsyncThunk(
  'loadOrdersAll',
  async (dto: ListOrdersAll, thunkAPI) => {
    try {
      const response = await orderService.ordersAll(dto);
      return thunkAPI.fulfillWithValue(response);
    } catch (e) {
      let error = e as AxiosError;
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
}
);

export {
  loadOrdersAll
}
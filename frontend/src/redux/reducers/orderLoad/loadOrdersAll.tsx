import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ListOrdersAllDto } from '../../../module/listOrdersAll.dto';

const loadOrdersAll = createAsyncThunk(
  'loadOrdersAll',
  async (dto: ListOrdersAllDto, thunkAPI) => {
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
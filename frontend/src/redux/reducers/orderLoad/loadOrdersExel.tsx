import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderService } from '../../../service/orders.service';
import { AxiosError } from 'axios';
import { ListOrdersExelDto } from '../../../module/listOrdersExel.dto';

const loadOrdersExel = createAsyncThunk(
  'loadOrdersExel',
  async (dto: ListOrdersExelDto, thunkAPI) => {
    try {
      await orderService.ordersExel(dto);
      return thunkAPI.fulfillWithValue('Export success');
    } catch (e) {
      const error = e as AxiosError;
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export {
  loadOrdersExel
}
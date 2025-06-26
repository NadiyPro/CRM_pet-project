import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ListOrdersAllDto } from '../../../module/orders_dto/listOrdersAll.dto';
import { orderService } from '../../../service/orders.service';

const loadOrdersAll = createAsyncThunk(
  'loadOrdersAll',
  async (dto: Partial<ListOrdersAllDto>, thunkAPI) => {
    try {
      const response = await orderService.ordersAll(dto);
      return thunkAPI.fulfillWithValue(response);
    } catch (e) {
      const error = e as AxiosError;
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
}
);

export {
  loadOrdersAll
}
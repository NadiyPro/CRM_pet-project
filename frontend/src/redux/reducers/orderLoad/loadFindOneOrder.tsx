import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { orderService } from '../../../service/orders.service';

const loadFindOneOrder = createAsyncThunk(
  'loadFindOneOrder',
  async (orderId: number, thunkAPI) => {
    try {
      const response = await orderService.findOneOrder(orderId);
      return thunkAPI.fulfillWithValue(response);
    } catch (e) {
      const error = e as AxiosError;
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
)

export {
  loadFindOneOrder
}
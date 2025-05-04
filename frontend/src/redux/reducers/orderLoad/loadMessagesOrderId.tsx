import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { orderService } from '../../../service/orders.service';

const loadMessagesOrderId = createAsyncThunk(
  'loadMessagesOrderId',
  async (orderId: number, thunkAPI) => {
    try {
      const response = await orderService.messagesOrderId(orderId);
      return thunkAPI.fulfillWithValue(response);
    } catch (e) {
      const error = e as AxiosError;
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
)

export {
  loadMessagesOrderId
}
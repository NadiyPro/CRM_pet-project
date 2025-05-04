import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoadCreateMessageDto } from '../../../module/loadCreateMessage.dto';
import { AxiosError } from 'axios';
import { orderService } from '../../../service/orders.service';

const loadCreateMessage = createAsyncThunk(
  'loadCreateMessage',
  async ({ orderId, dataMessage }:LoadCreateMessageDto, thunkApi)=> {
    try {
      const response = await orderService.createMessage(orderId, dataMessage );
      return thunkApi.fulfillWithValue(response);
    } catch (e) {
      const error = e as AxiosError;
      return thunkApi.rejectWithValue(error?.response?.data);
    }
  }
)

export {
  loadCreateMessage
}
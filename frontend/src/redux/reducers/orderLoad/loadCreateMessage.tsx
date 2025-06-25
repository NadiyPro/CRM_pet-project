import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoadCreateMessageDto } from '../../../module/loadCreateMessage.dto';
import { orderService } from '../../../service/orders.service';
import { orderAction } from '../../slices/orderSlice';
import { AxiosError } from 'axios';

const loadCreateMessage = createAsyncThunk(
  'loadCreateMessage',
  async ({ orderId, dataMessage }:LoadCreateMessageDto, thunkApi)=> {
    try {
      const response = await orderService.createMessage(orderId, dataMessage );
      return thunkApi.fulfillWithValue(response);
    } catch (e) {
      const error = e as AxiosError;
      thunkApi.dispatch(orderAction.setCreateMessageError('Помилка. Заявка знаходиться в роботі у іншого менеджера.)'));
      setTimeout(()=>{
        thunkApi.dispatch(orderAction.setCreateMessageError(null));
      }, 4000)
      return thunkApi.rejectWithValue(error?.response?.data);
    }
  }
)

export {
  loadCreateMessage
}
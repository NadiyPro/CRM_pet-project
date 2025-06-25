import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoadCreateMessageDto } from '../../../module/loadCreateMessage.dto';
import { orderService } from '../../../service/orders.service';

const loadCreateMessage = createAsyncThunk(
  'loadCreateMessage',
  async ({ orderId, dataMessage }:LoadCreateMessageDto, thunkApi)=> {
    try {
      const response = await orderService.createMessage(orderId, dataMessage );
      return thunkApi.fulfillWithValue(response);
    } catch {
      return thunkApi.rejectWithValue('Помилка. Заявка знаходиться в роботі у іншого менеджера.');
    }
  }
)

export {
  loadCreateMessage
}
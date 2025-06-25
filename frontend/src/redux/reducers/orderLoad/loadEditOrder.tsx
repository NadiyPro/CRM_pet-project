import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoadEditOrderDto } from '../../../module/loadEditOrder.dto';
import { AxiosError } from 'axios';
import { orderService } from '../../../service/orders.service';
import { orderAction } from '../../slices/orderSlice';

const loadEditOrder = createAsyncThunk(
  'loadEditOrder',
  async ({orderId, updateOrdersReqDto}:LoadEditOrderDto, thunkAPI) => {
    try {
      const response = await orderService.editOrder(orderId, updateOrdersReqDto);
      thunkAPI.dispatch(orderAction.setIsUpdateEditOrder({ text: 'Дані в заявці успішно оновлено', type: 'success' }));
      setTimeout(()=>{
        thunkAPI.dispatch(orderAction.setIsUpdateEditOrder(null));
      }, 5000)
      return thunkAPI.fulfillWithValue(response);
    } catch (e) {
      const error = e as AxiosError;
      thunkAPI.dispatch(orderAction.setIsUpdateEditOrder({ text: 'Помилка. Заявка заходиться в роботі у іншого менеджера', type: 'error' }));
      setTimeout(()=>{
        thunkAPI.dispatch(orderAction.setIsUpdateEditOrder(null));
      }, 5000)
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
)

export {
  loadEditOrder
}
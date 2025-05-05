import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoadEditOrderDto } from '../../../module/loadEditOrder.dto';
import { AxiosError } from 'axios';
import { orderService } from '../../../service/orders.service';

const loadEditOrder = createAsyncThunk(
  'loadEditOrder',
  async ({orderId, updateOrdersReqDto}:LoadEditOrderDto, thunkApi) => {
    try {
      const response = await orderService.editOrder(orderId, updateOrdersReqDto);
      return thunkApi.fulfillWithValue(response);
    } catch (e) {
      const error = e as AxiosError;
      return thunkApi.rejectWithValue(error?.response?.data);
    }
  }
)

export {
  loadEditOrder
}
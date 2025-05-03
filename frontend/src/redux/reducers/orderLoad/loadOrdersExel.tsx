import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderService } from '../../../service/orders.service';
import { AxiosError } from 'axios';
import { ListOrdersExelDto } from '../../../module/listOrdersExel.dto';
import { orderAction } from '../../slices/orderSlice';

const loadOrdersExel = createAsyncThunk(
  'loadOrdersExel',
  async (dto: ListOrdersExelDto, thunkAPI) => {
    try {
      await orderService.ordersExel(dto);
      thunkAPI.dispatch(orderAction.setExportSuccess('Файл успішно завантажено'));
      setTimeout(() => {
        thunkAPI.dispatch(orderAction.setExportSuccess(''));
      }, 10000);
      return thunkAPI.fulfillWithValue('Export success');
    } catch (e) {
      const error = e as AxiosError;
      thunkAPI.dispatch(orderAction.setExportSuccess('Ooops, виникла помилка при завантаженні файла'));
      setTimeout(() => {
        thunkAPI.dispatch(orderAction.setExportSuccess(''));
      }, 10000);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export {
  loadOrdersExel
}
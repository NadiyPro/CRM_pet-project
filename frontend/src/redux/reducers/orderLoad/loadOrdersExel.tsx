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
      thunkAPI.dispatch(orderAction.setExportSuccess({ text: 'Файл успішно завантажено', type: 'success' }));
      setTimeout(() => {
        thunkAPI.dispatch(orderAction.setExportSuccess(null));
      }, 7000);
      return thunkAPI.fulfillWithValue('Файл успішно завантажено');
    } catch (e) {
      const error = e as AxiosError;
      thunkAPI.dispatch(orderAction.setExportSuccess({ text: 'Виникла помилка при завантаженні файла', type: 'error' }));
      setTimeout(() => {
        thunkAPI.dispatch(orderAction.setExportSuccess(null));
      }, 7000);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export {
  loadOrdersExel
}
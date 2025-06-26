import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoadAddGroupDto } from '../../../module/orders_dto/loadAddGroup.dto';
import { AxiosError } from 'axios';
import { orderService } from '../../../service/orders.service';
import { orderAction } from '../../slices/orderSlice';

const loadAddGroup = createAsyncThunk(
  'loadAddGroup',
  async ({orderId, group_id}: LoadAddGroupDto, thunkAPI) => {
    try {
      const response = await orderService.addGroup(orderId, group_id);
      thunkAPI.dispatch(orderAction.setIsGroupOrder({ text: 'Група успішно закріплена за заявкою', type: 'success'}));
      setTimeout(()=>{
        thunkAPI.dispatch(orderAction.setIsGroupOrder(null));
      }, 4000)
      return thunkAPI.fulfillWithValue(response);
    } catch (e) {
      const error = e as AxiosError;
      thunkAPI.dispatch(orderAction.setIsGroupOrder({ text: 'Помилка. Перевірте права доступу (доступ лише для ролі admin)', type: 'error'}));
      setTimeout(()=>{
        thunkAPI.dispatch(orderAction.setIsGroupOrder(null));
      }, 4000)
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
)

export {
  loadAddGroup
}
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { adminService } from '../../../service/admin.service';
import { adminAction } from '../../slices/adminSlice';

const loadBanUser = createAsyncThunk(
  'loadBanUser',
  async (managerId: string, thunkAPI) => {
    try {
      const response = await adminService.banUser(managerId);
      thunkAPI.dispatch(adminAction.setIsBanUser({ text: 'Користувача заблоковано', type: 'success', id: managerId }));
      setTimeout(()=>{
        thunkAPI.dispatch(adminAction.setIsBanUser(null));
      }, 5000)
      return thunkAPI.fulfillWithValue(response);
    } catch (e) {
      const error = e as AxiosError;
      thunkAPI.dispatch(adminAction.setIsBanUser({ text: 'Помилка. Перевірте права доступу (доступ лише для ролі admin)', type: 'error', id: managerId }));
      setTimeout(()=>{
        thunkAPI.dispatch(adminAction.setIsBanUser(null));
      }, 5000)
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)

export {
  loadBanUser
}
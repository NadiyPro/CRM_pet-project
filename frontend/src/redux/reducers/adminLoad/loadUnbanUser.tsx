import { createAsyncThunk } from '@reduxjs/toolkit';
import { adminService } from '../../../service/admin.service';
import { AxiosError } from 'axios';
import { adminAction } from '../../slices/adminSlice';

const loadUnbanUser = createAsyncThunk(
  'loadUnbanUser',
  async (managerId: string, thunkAPI) => {
    try {
      const response = await adminService.unbanUser(managerId);
      thunkAPI.dispatch(adminAction.setIsUnbanUser({ text: 'Користувача розблоковано', type: 'success', id: managerId }));
      setTimeout(()=>{
        thunkAPI.dispatch(adminAction.setIsUnbanUser(null));
      }, 5000)
      return thunkAPI.fulfillWithValue(response);
    } catch (e) {
      const error = e as AxiosError;
      // thunkAPI.dispatch(adminAction.setIsUnbanUser({ text: 'Помилка. Перевірте права доступу', type: 'error', id: managerId }));
      // setTimeout(()=>{
      //   thunkAPI.dispatch(adminAction.setIsUnbanUser(null));
      // }, 5000)
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)

export {
  loadUnbanUser
}
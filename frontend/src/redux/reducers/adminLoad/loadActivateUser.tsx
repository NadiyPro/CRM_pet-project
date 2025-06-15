import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { adminService } from '../../../service/admin.service';
import { adminAction } from '../../slices/adminSlice';

const loadActivateUser = createAsyncThunk(
  'loadActivateUser',
  async (managerId: string, thunkAPI) => {
    try {
      const response = await adminService.activateUser(managerId);
      thunkAPI.dispatch(adminAction.setIsActivateUser({ text: 'Посиланням для активації / відновлення паролю, успішно  відправлено на email користувача.', type: 'success' }));
      setTimeout(()=>{
        thunkAPI.dispatch(adminAction.setIsActivateUser(null));
      }, 10000)
      return thunkAPI.fulfillWithValue(response);
    } catch (e) {
      const error = e as AxiosError;
      thunkAPI.dispatch(adminAction.setIsActivateUser({ text: 'Помилка. Лист не відправлено, перевірте права доступу (опція доступна лише для ролі admin).', type: 'error' }));
      setTimeout(()=>{
        thunkAPI.dispatch(adminAction.setIsActivateUser(null));
      }, 10000)
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
)

export {
  loadActivateUser
}
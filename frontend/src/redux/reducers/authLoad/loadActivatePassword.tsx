import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { authService } from '../../../service/auth.service';
import { LoadActivatePasswordDto } from '../../../module/admin_dto/loadActivatePassword.dto';

const loadActivatePassword = createAsyncThunk(
  'loadActivatePassword',
  async ({ token, authPasswordDto } : LoadActivatePasswordDto, thunkApi) => {
    try {
      const response = await authService.activatePassword(token, authPasswordDto);
      return thunkApi.fulfillWithValue(response);
    } catch (e) {
      const error = e as AxiosError;
      return thunkApi.rejectWithValue(error?.response?.data);
    }
  }
)

export {
  loadActivatePassword
}
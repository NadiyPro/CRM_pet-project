import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { authService } from '../../../service/auth.service';
import { LoadActivatePasswordDto } from '../../../module/loadActivatePassword.dto';

const loadActivatePassword = createAsyncThunk(
  'loadActivatePassword',
  async ({ refreshToken, authPasswordDto } : LoadActivatePasswordDto, thunkApi) => {
    try {
      const response = await authService.activatePassword(refreshToken, authPasswordDto);
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
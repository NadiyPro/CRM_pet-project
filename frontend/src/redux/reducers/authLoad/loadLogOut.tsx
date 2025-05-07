import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../../service/auth.service';
import { AxiosError } from 'axios';

const loadLogOut = createAsyncThunk(
  'authLogOut',
  async  (_, thunkAPI) => {
    try {
      const response = await authService.authLogOut();
      return thunkAPI.fulfillWithValue(response);
    } catch (e) {
      const error = e as AxiosError;
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export {
  loadLogOut
}
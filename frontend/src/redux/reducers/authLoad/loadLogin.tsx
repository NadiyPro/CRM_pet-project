import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { AuthLoginDto } from '../../../module/authLogin.dto';
import { authService } from '../../../service/auth.service';

const loadLogin = createAsyncThunk(
  'authLogin',
  async  (dto:AuthLoginDto, thunkAPI) => {
    try {
      const response = await authService.authLogin(dto);
      return thunkAPI.fulfillWithValue(response);
    } catch (e) {
      const error = e as AxiosError;
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export {
  loadLogin
}
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { AuthLoginModule } from '../../../module/authLoginModule';
import { authService } from '../../../service/api.service';

const loadLogin = createAsyncThunk(
  'authLogin',
  async  (dto:AuthLoginModule, thunkAPI) => {
    try {
      let response = await authService.authentication(dto);
      return thunkAPI.fulfillWithValue(response);
    } catch (e) {
      let error = e as AxiosError;
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export {
  loadLogin
}
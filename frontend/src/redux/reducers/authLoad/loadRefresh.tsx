import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { authService } from '../../../service/auth.service';
import { AuthTokenDto } from '../../../module/auth_dto/authToken.dto';

const loadRefresh = createAsyncThunk<AuthTokenDto, void>(
  'loadRefresh',
  async (_, thunkAPI) => {
    try {
      const response = await authService.refresh();
      return thunkAPI.fulfillWithValue(response);
    } catch (e) {
      const error = e as AxiosError;
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
)

export {
  loadRefresh
}
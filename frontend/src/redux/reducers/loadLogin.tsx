import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { AuthLoginModule } from '../../module/authLoginModule';
import { authService } from '../../service/api.service';
import { AuthTokenModule } from '../../module/authTokenModule';

// const getDeviceId = (): string => {
//   let deviceId = localStorage.getItem('deviceId');
//   if (!deviceId) {
//     deviceId = crypto.randomUUID();
//     localStorage.setItem('deviceId', deviceId);
//   }
//   return deviceId;
// };

const loadLogin = createAsyncThunk(
  'authLogin',
  async  (dto:AuthLoginModule, thunkAPI) => {
    try {
      // const dtoDeviceId: AuthLoginModule = {
      //   ...dto,
      //   deviceId: getDeviceId(),
      // };
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
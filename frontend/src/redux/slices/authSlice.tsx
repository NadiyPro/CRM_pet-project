import { createSlice } from '@reduxjs/toolkit';
import { loadLogin } from '../reducers/authLoad/loadLogin';
import { AuthLoginDto } from '../../module/authLogin.dto';
import { loadLogOut } from '../reducers/authLoad/loadLogOut';

interface AuthSliceInterface {
  isValid: boolean;
  dto: AuthLoginDto
}

const initialState: AuthSliceInterface = {
  isValid: false,
  dto:{
    email: '',
    password: '',
    deviceId: '',
  }
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {},
  extraReducers:  (builder) => {
    builder
      .addCase(
        loadLogin.fulfilled, (state, action) => {
          state.isValid = action.payload;
    })
      .addCase(loadLogin.rejected, (state, action) => {
          console.error('Помилка при авторизації користувача:', action.payload);
        }
      )
      .addCase(
        loadLogOut.fulfilled, (state) => {
          state.isValid = false;
        })
      .addCase(loadLogin.rejected, (state, action) => {
          console.error('Помилка при виході користувача з платформи:', action.payload);
        }
      )
  }
});

export const authAction = {
  ...authSlice.actions,
  loadLogin,
  loadLogOut
}
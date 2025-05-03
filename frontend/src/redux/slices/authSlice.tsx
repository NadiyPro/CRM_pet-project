import { createSlice } from '@reduxjs/toolkit';
import { loadLogin } from '../reducers/authLoad/loadLogin';
import { AuthLoginDto } from '../../module/authLogin.dto';
import { loadLogOut } from '../reducers/authLoad/loadLogOut';
import { loadActivatePassword } from '../reducers/authLoad/loadActivatePassword';

interface AuthSliceInterface {
  isValid: boolean;
  dto: AuthLoginDto,
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
      .addCase(
        loadActivatePassword.fulfilled, (state, action) => {
          state.isValid = action.payload;
        })
      .addCase(loadLogin.rejected, (state, action) => {
          console.error('Помилка при введені паролю для реєстрації / зміни:', action.payload);
        }
      )
  }
});

export const authAction = {
  ...authSlice.actions,
  loadLogin,
  loadLogOut,
  loadActivatePassword
}
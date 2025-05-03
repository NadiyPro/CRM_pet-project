import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadLogin } from '../reducers/authLoad/loadLogin';
import { AuthLoginDto } from '../../module/authLogin.dto';
import { loadLogOut } from '../reducers/authLoad/loadLogOut';
import { loadActivatePassword } from '../reducers/authLoad/loadActivatePassword';

interface AuthSliceInterface {
  isValid: boolean;
  dto: AuthLoginDto;
  loadingLogin: boolean;
  loadingPassword: boolean;
  errorLogin: string | null;
}

const initialState: AuthSliceInterface = {
  isValid: false,
  dto:{
    email: '',
    password: '',
    deviceId: '',
  },
  loadingLogin: false,
  loadingPassword: false,
  errorLogin: null
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {
    setLoadingPassword(state, action: PayloadAction<boolean>) {
      state.loadingPassword = action.payload;
    },
  },
  extraReducers:  (builder) => {
    builder
      .addCase(
        loadLogin.fulfilled, (state, action) => {
          state.isValid = action.payload;
          state.loadingLogin = false;
          state.errorLogin = null;
        })
      .addCase(loadLogin.pending, (state) => {
        state.loadingLogin = true;
        state.errorLogin = null;
      })
      .addCase(loadLogin.rejected, (state, action) => {
        state.loadingLogin = false;
        state.errorLogin = 'Користувач за вказаними даними не зареєстрований. Будь ласка, перевірте коректність введених даних.'
        console.error('Помилка, невірний email або пароль:', action.payload);
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
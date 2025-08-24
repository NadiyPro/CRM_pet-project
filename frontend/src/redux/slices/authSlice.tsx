import { createSlice } from '@reduxjs/toolkit';
import { loadLogin } from '../reducers/authLoad/loadLogin';
import { loadLogOut } from '../reducers/authLoad/loadLogOut';
import { loadActivatePassword } from '../reducers/authLoad/loadActivatePassword';
import { initialStateAuth } from '../initialState/auth_initialState';
import { loadRefresh } from '../reducers/authLoad/loadRefresh';


export const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialStateAuth,
  reducers: {},
  extraReducers:  (builder) => {
    builder
      .addCase(
        loadLogin.fulfilled, (state, action) => {
          state.isValid = action.payload;
          state.loadingLogin = false;
          state.errorLogin = null;
          state.isValidRefresh = true;
        })
      .addCase(loadLogin.pending, (state) => {
        state.loadingLogin = true;
        state.errorLogin = null;
      })
      .addCase(loadLogin.rejected, (state) => {
        state.loadingLogin = false;
        state.errorLogin = 'Будь ласка, перевірте коректність введених даних.'
        }
      )
      .addCase(
        loadLogOut.fulfilled, (state) => {
          state.isValid = false;
        })
      .addCase(loadLogOut.rejected, (state, action) => {
          console.error('Помилка при виході користувача з платформи:', action.payload);
        }
      )
      .addCase(
        loadActivatePassword.fulfilled, (state, action) => {
          state.isValidPassword = action.payload;
          state.loadingPassword = false;
          state.errorPassword = null;
        })
      .addCase(loadActivatePassword.pending, (state) => {
        state.loadingPassword = true;
        state.errorPassword = null;
      })
      .addCase(loadActivatePassword.rejected, (state) => {
          state.loadingPassword = false;
          state.errorPassword = 'Будь ласка, перевірте чи збігаються password та confirm_password / термін дії посилання для реєстрації.'
        }
      )
      .addCase(loadRefresh.pending, (state) => {
        state.loadingRefresh = true;
        state.errorLogin = null;
      })
      .addCase(loadRefresh.fulfilled, (state) => {
          state.isValid = true;
          state.isValidRefresh = true;
          state.loadingRefresh = false;
      }
      )
      .addCase(loadRefresh.rejected, (state) => {
        state.isValid = false;
        state.isValidRefresh = false;
        state.loadingRefresh = false;
      });

  }
});

export const authAction = {
  ...authSlice.actions,
  loadLogin,
  loadLogOut,
  loadActivatePassword,
  loadRefresh
}
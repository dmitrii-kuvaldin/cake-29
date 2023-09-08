import { createSlice } from '@reduxjs/toolkit';
import AuthState from '../../types/auth.types';
import { fetchUser, loginUser, logoutUser, registerUser } from './auth.action';

export interface ErrorItem {
  field: string;
  message: string;
  rejectedValue: string;
}

const initialState: AuthState = {
  authChecked: false,
  user: undefined,
  loginFormError: undefined,
  registerFormError: undefined,
}



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.authChecked = true
        state.user = action.payload
      })
      .addCase(fetchUser.rejected, (state) => {
        state.authChecked = true
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loginFormError = undefined;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log('action login', action);
        state.loginFormError = undefined;
        state.loginFormError = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = undefined;
        state.authChecked = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.registerFormError = undefined;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerFormError = action.payload as any;
      });
  }
})

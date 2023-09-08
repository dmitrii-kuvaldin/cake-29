import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Data from '../../types/data.types';
import RegisterData from '../../types/registerData.types';


export const fetchUser = createAsyncThunk(
  'fetchUser',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/api/users/me`)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)



export const registerUser = createAsyncThunk(
  'registerUser',
  async (data: RegisterData, thunkAPI) => {
    try {
      const response = await axios.post(`/api/registration`, data, {
        headers: {
          "Content-Type": "application/json",
        }
      })
      console.log('response.data  =====>>>>', response.data);
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.errors)
    }
  }
)



export const loginUser = createAsyncThunk(
  'loginUser',
  async (data: Data, thunkAPI) => {
    if (!data.username.trim() || !data.password.trim()) {
      throw new Error("Не все поля заполнены");
    }
    try {
      const response = await axios.post(`/api/login`, `username=${data.username}&password=${data.password}`)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'logoutUser',
  async (_, thunkAPI) => {
    try {
      await axios.put("/api/logout")
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)



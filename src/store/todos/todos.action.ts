import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// function getErrorMessage(error: any) {
//   if (error.message) {
//     return error;
//   }
//   return 'An error occurred';
// }

export const fetchTodos = createAsyncThunk(
  'fetchTodoThunk',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:3001/todos')
      return response.data
    } catch (error) {
      console.log('error ====>', error);
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const addTodo = createAsyncThunk(
  'addTodoThunk',
  async (todo: object, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3001/todos', todo)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const delTodo = createAsyncThunk(
  'delTodoThunk',
  async (id: number, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`)
      return id
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

interface EditTodoPayload {
  id: number;
  updatedTodo: object; // Adjust the type according to your todo structure
}

export const editTodo = createAsyncThunk(
  'editTodoThunk',
  async ({ id, updatedTodo }: EditTodoPayload, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:3001/todos/${id}`, updatedTodo)
      return { id, updatedTodo: response.data }
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)


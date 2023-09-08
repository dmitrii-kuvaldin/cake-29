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
      const response = await axios.get('/api/users/my/tasks')
      return response.data
    } catch (error) {
      console.log('error ====>', error);
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const fetchTodosAll = createAsyncThunk(
  'fetchTodosAllThunk',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/tasks')
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
      console.log('todo!!', todo);
      const response = await axios.post('/api/tasks', todo, {
        headers: {
          "Content-Type": "application/json",
        }
      })
      console.log('response.data', response.data);
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const delTodo = createAsyncThunk(
  'delTodoThunk',
  async (id: number, thunkAPI) => {
    console.log('id', id);
    try {
      await axios.delete(`/api/tasks/${id}`)
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
      const response = await axios.put(`/api/tasks/${id}`, updatedTodo, {
        headers: {
          "Content-Type": "application/json",
        }
      })
      return { id, updatedTodo: response.data }
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)


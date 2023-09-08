import { createSlice } from '@reduxjs/toolkit';
import { addTodo, delTodo, editTodo, fetchTodos, fetchTodosAll } from './todos.action';
import { TodosState } from '../../types/todos.types';




const initialState: TodosState = {
  isLoading: false,
  error: null,
  todos: { tasks: [] }
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTodosAll.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchTodosAll.fulfilled, (state, action) => {
        state.isLoading = false
        state.todos = action.payload
      })
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false
        state.todos = action.payload
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false
        state.todos = { tasks: [] }
        if (action.payload) {
          state.error = action.payload
        }
        // } else {
        //   state.error = action.payload.error
        // }
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.tasks.push(action.payload)
      })
      .addCase(delTodo.fulfilled, (state, action) => {
        state.todos.tasks = state.todos.tasks.filter(todo => todo.id !== action.payload)
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        const { id, updatedTodo } = action.payload;
        const index = state.todos.tasks.findIndex((todo) => todo.id === id);
        if (index !== -1) {
          state.todos.tasks[index] = updatedTodo;
        }
      });
  }
})

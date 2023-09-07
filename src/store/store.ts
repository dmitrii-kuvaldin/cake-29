import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { todosSlice } from './todos/todos.slice';


const reducers = combineReducers({
  todos: todosSlice.reducer
})

export const store = configureStore({
  reducer: reducers,
  devTools: true
})

export type RootState = ReturnType<typeof store.getState> //root state
export type AppDispatch = typeof store.dispatch

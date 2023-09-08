import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/auth.slice';
import { todosSlice } from './todos/todos.slice';

export const reducers = combineReducers({
  auth: authSlice.reducer,
  todos: todosSlice.reducer
})

export const store = configureStore({
  reducer: reducers,
  devTools: true
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

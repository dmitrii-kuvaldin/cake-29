import { SerializedError } from '@reduxjs/toolkit';

export interface ITodo {
  id: number;
  name: string;
  description: string;
}

export interface TodosState {
  isLoading: boolean;
  error: SerializedError | null;
  todos: { tasks: ITodo[]; }
}

export interface ITodoData extends Omit<ITodo, 'id'> { }

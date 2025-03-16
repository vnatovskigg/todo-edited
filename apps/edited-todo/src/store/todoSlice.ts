import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk('todos/fetch', async () => {
  const response = await fetch('/api/todos');
  const data = await response.json();
  return data as Todo[];
});

export const addTodoAsync = createAsyncThunk(
  'todos/add',
  async (text: string) => {
    if (!text.trim()) throw new Error('Todo text cannot be empty');
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    return data as Todo;
  }
);

export const toggleTodoAsync = createAsyncThunk(
  'todos/complete',
  async (todoId: number) => {
    const response = await fetch(`/api/todos/${todoId}`, {
      method: 'PATCH',
    });
    const data = await response.json();
    return data as Todo;
  }
);

export const deleteTodoAsync = createAsyncThunk(
  'todos/delete',
  async (todoId: number) => {
    await fetch(`/api/todos/${todoId}`, {
      method: 'DELETE',
    });
    return todoId;
  }
);

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch todos';
      })
      .addCase(addTodoAsync.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      })
      .addCase(toggleTodoAsync.fulfilled, (state, action: PayloadAction<Todo>) => {
        const updatedTodo = action.payload;
        const index = state.todos.findIndex((t) => t.id === updatedTodo.id);
        if (index !== -1) {
          state.todos[index] = updatedTodo;
        }
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action: PayloadAction<number>) => {
        state.todos = state.todos.filter((t) => t.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;

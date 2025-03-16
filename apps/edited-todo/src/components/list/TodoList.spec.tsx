import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../../store/todoSlice';
import TodoList from './TodoList';

describe('TodoList', () => {
  let store: ReturnType<typeof configureStore>;

  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    ) as jest.Mock;
  });

  afterAll(() => {
    (global.fetch as jest.Mock).mockClear();
    delete (global as any).fetch;
  });
  
  beforeEach(() => {
    store = configureStore({
      reducer: {
        todos: todosReducer,
      },
      preloadedState: {
        todos: {
          todos: [],
          loading: false,
          error: null,
        },
      },
    });
  });

  it('should render successfully and display the "Tasks to do" text', async () => {
    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Tasks to do - 0/i)).toBeTruthy();
    });
  });
});

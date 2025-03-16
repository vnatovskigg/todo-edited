import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';
import { Todo, toggleTodoAsync, deleteTodoAsync } from '../../store/todoSlice';
import { useDispatch } from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('../../store/todoSlice', () => ({
  ...jest.requireActual('../../store/todoSlice'),
  toggleTodoAsync: jest.fn(),
  deleteTodoAsync: jest.fn(),
}));

describe('TodoItem', () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const todoMock: Todo = { id: 1, text: 'Test Todo', completed: false };

  it('renders and displays the todo text', () => {
    render(<TodoItem todo={todoMock} />);
    const textElement = screen.getByText('Test Todo');
    expect(textElement).toBeTruthy();
  });

  it('dispatches toggleTodoAsync when the toggle button is clicked', () => {
    const fakeToggleThunk = { type: 'fakeToggleThunk' };
    (toggleTodoAsync as unknown as jest.Mock).mockReturnValue(fakeToggleThunk);

    render(<TodoItem todo={todoMock} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);

    expect(toggleTodoAsync).toHaveBeenCalledWith(todoMock.id);
    expect(dispatchMock).toHaveBeenCalledWith(fakeToggleThunk);
  });

  it('dispatches deleteTodoAsync when the delete button is clicked', () => {
    const fakeDeleteThunk = { type: 'fakeDeleteThunk' };
    (deleteTodoAsync as unknown as jest.Mock).mockReturnValue(fakeDeleteThunk);

    render(<TodoItem todo={todoMock} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);

    expect(deleteTodoAsync).toHaveBeenCalledWith(todoMock.id);
    expect(dispatchMock).toHaveBeenCalledWith(fakeDeleteThunk);
  });
});

import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';
import { Todo, toggleTodoAsync, deleteTodoAsync } from '../../store/todoSlice';
import { useDispatch } from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
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

  it('should render successfully and display the todo text', () => {
    render(<TodoItem todo={todoMock} />);
    expect(screen.getByText('Test Todo')).toBeTruthy();
  });

  it('should dispatch toggleTodoAsync when the toggle button is clicked', () => {
    render(<TodoItem todo={todoMock} />);

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(toggleTodoAsync(todoMock.id));
  });

  it('should dispatch deleteTodoAsync when the delete button is clicked', () => {
    render(<TodoItem todo={todoMock} />);

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(deleteTodoAsync(todoMock.id));
  });
});

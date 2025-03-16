import { render, screen, fireEvent } from '@testing-library/react';
import TodoForm from './TodoForm';
import { useDispatch } from 'react-redux';
import { addTodoAsync } from '../../store/todoSlice';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('../../store/todoSlice', () => ({
  ...jest.requireActual('../../store/todoSlice'),
  addTodoAsync: jest.fn(),
}));

describe('TodoForm', () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<TodoForm />);
    expect(screen.getByPlaceholderText('Add a new task')).toBeTruthy();
  });

  it('does not dispatch any action if input is empty', () => {
    render(<TodoForm />);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it('dispatches addTodoAsync and clears input on valid submit', () => {
    const fakeThunk = { type: 'fakeThunk' };
    (addTodoAsync as unknown as jest.Mock).mockReturnValue(fakeThunk);

    render(<TodoForm />);
    const input = screen.getByPlaceholderText('Add a new task') as HTMLInputElement;
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'New Todo' } });
    expect(input.value).toBe('New Todo');

    fireEvent.click(button);

    expect(addTodoAsync).toHaveBeenCalledWith('New Todo');
    expect(dispatchMock).toHaveBeenCalledWith(fakeThunk);
    expect(input.value).toBe('');
  });
});
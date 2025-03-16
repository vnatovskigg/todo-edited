import { render, screen, fireEvent } from '@testing-library/react';
import TodoForm from './TodoForm';
import { addTodoAsync } from '../../store/todoSlice';
import { useDispatch } from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('TodoForm', () => {
  let dispatchMock: jest.Mock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    const { baseElement } = render(<TodoForm />);
    expect(baseElement).toBeTruthy();
  });

  it('should not dispatch any action if input is empty', () => {
    render(<TodoForm />);
    const input = screen.getByPlaceholderText('Add a new task');
    const button = screen.getByRole('button');
    
    fireEvent.change(input, { target: { value: '  ' } });
    fireEvent.click(button);

    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it('should dispatch addTodoAsync and clear input on valid submit', () => {
    render(<TodoForm />);
    const input = screen.getByPlaceholderText('Add a new task') as HTMLInputElement;
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'New Todo' } });
    expect(input.value).toBe('New Todo');

    fireEvent.click(button);

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(addTodoAsync('New Todo'));

    expect(input.value).toBe('');
  });
});

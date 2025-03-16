import { render } from '@testing-library/react';

import TodoList from './TodoList';

describe('TodoList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TodoList />);
    expect(baseElement).toBeTruthy();
  });
});

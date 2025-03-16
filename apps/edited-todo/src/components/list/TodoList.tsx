import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store'
import TodoItem from '../item/TodoItem'
import { fetchTodos, Todo } from '../../store/todoSlice'
import styles from './TodoList.module.scss'

const TodoList: React.FC = () => {
  const { todos, loading, error } = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const [pending, completed] = useMemo(() => {
    return todos.reduce<[Todo[], Todo[]]>(
      ([pending, completed], curr) => {
        if (curr.completed) {
          completed.push(curr);
        } else {
          pending.push(curr);
        }
        return [pending, completed];
      },
      [[], []]
    );
  }, [todos]);
  
  if (loading) {
    return <div>Loading todos…</div>;
  }

  if (error) {
    return <div>Something went wrong. Please reload.</div>;
  }
  
  return (
    <>
      <div className={styles.todoGroup}>
        <span>Tasks to do - {pending.length}</span>
        {pending.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>

      <div className={styles.todoGroup}>
        <span>Done - {completed.length}</span>
        {completed.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </>
  );
};

export default TodoList;

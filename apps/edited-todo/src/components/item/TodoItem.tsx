import React from 'react';
import { useDispatch } from 'react-redux';
import { Todo, toggleTodoAsync, deleteTodoAsync } from '../../store/todoSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import styles from './TodoItem.module.scss'
import { AppDispatch } from '../../store/store';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={classNames(styles.container, { [styles.completed]: todo.completed })}>
      <span
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          flexGrow: 1,
        }}
      >
        {todo.text}
      </span>
      <button onClick={() => dispatch(toggleTodoAsync(todo.id))}>
        <FontAwesomeIcon icon={faCheck} className={styles.icon} size='lg' />
      </button>
      <button onClick={() => dispatch(deleteTodoAsync(todo.id))} className={styles.icon}>
        <FontAwesomeIcon icon={faTrash} className={styles.icon} size='lg' />
      </button>
    </div>
  );
};

export default TodoItem;

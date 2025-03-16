
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAsync } from '../../store/todoSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './TodoForm.module.scss'
import { AppDispatch } from '../../store/store';

const TodoForm: React.FC = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === '') return;
    dispatch(addTodoAsync(text));
    setText('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Add a new task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className={styles.button} type='submit'>
        <FontAwesomeIcon icon={faPlus} color='white' />
      </button>
    </form>
  );
};

export default TodoForm;

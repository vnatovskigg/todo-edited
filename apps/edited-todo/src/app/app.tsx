import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import TodoForm from '../components/form/TodoForm'
import TodoList from '../components/list/TodoList'
import styles from './app.module.scss'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <TodoForm />
          <TodoList />
        </div>
      </div>
    </Provider>
  );
};

export default App;

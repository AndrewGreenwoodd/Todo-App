import styles from '../components/NewTodo.module.css'
import classes from '../UI/Button.module.css'
import Button from '../UI/Button';
import closeButton from '../assets/closeIcon.png';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { todoActions } from '../store';
import { useRef } from 'react';
import { useSelector } from 'react-redux'

export interface RootState {
  todo: {
    items: [];
    filter: 'All' | 'Unfinished' | 'Finished'
  };
}



const NewTodo: React.FC = () => {
  function formatDateString(inputDateString: string) {
    const date = new Date(inputDateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'UTC'
    });
  }

  const toDoesLength = useSelector((state: RootState) => state.todo.items.length);
  const dispatch = useDispatch();
  const toggleModal = () => {
    dispatch(todoActions.toggleModal());
  }
  const titleRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);

  const addTodoHandler = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(todoActions.addTodo({
      id: toDoesLength + 2,
      name: titleRef.current?.value || 'Empty',
      finished: statusRef.current?.value || '',
      date: formatDateString(new Date().toISOString())
    }))
    dispatch(todoActions.toggleModal());
  }
  return <>
    <div className={styles.backdrop}>
      <div className={styles.newTodoModal}>
        <h2>Add Todo</h2>
        <form className={styles.modalWrapper}>
          <label htmlFor='title'>Title</label>
          <input className={styles.modalInput} type="text" id='title' ref={titleRef}></input>
          <label htmlFor='status'>Status</label>
          <select className={styles.select} id='status' ref={statusRef}>
            <option>Unfinished</option>
            <option>Finished</option>
          </select>
          <div className={styles.modalButtons}>
            <Button className={classes.green} type="submit" onClick={addTodoHandler}>Add Task</Button>
            <Button className={classes.gray} type="button" onClick={toggleModal}>Cancel</Button>
          </div>
          <button className={styles.closeButton} style={{ backgroundImage: `url(${closeButton})` }} onClick={toggleModal}>
          </button>

        </form>
      </div>
    </div>
  </>
}


export default NewTodo;
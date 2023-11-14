import styles from '../components/NewTodo.module.css'
import classes from '../UI/Button.module.css'
import Button from '../UI/Button';
import closeButton from '../assets/closeIcon.png';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { todoActions } from '../store';
import { useRef, useState, useEffect } from 'react';

export interface RootState {
    todo: {
        items: [];
    };
}

// type EditTodo = Pick<TodoItem, 'id' | 'finished' | 'name'>;//це щоб вибрати які типи потрібно
interface EditTodo {
    id?: number| undefined;
    name: string | undefined;
    finished: string | undefined;
}

const EditToDo: React.FC<EditTodo> = ({ id, name, finished }) => {
    const [editedName, setEditedName] = useState(name);
    const [editedStatus, setEditedStatus] = useState(finished);
    const dispatch = useDispatch();
    
    useEffect(() => {
        // Reset state when new props are received
        setEditedName(name);
        setEditedStatus(finished);
      }, [name, finished]);
    
    const toggleModal = () => {
        dispatch(todoActions.setEditing({})); //mb treba minyati
    }
    const titleRef = useRef<HTMLInputElement>(null);
    const statusRef = useRef<HTMLSelectElement>(null);

    const editTodoHandler = () => {
        dispatch(todoActions.editTodo({
             id, name: titleRef.current?.value || 'Empty',
             finished: statusRef.current?.value || '', }));
        dispatch(todoActions.setEditing({})); //mb treba minyati
    }

    return <>
        <div className={styles.backdrop}>
            <div className={styles.newTodoModal}>
                <h2>{`Edit ${name}`}</h2>
                <form className={styles.modalWrapper} >
                    <label htmlFor='title'>Title</label>
                    <input className={styles.modalInput} type="text" id='title' ref={titleRef} value={editedName}  onChange={(e) => setEditedName(e.target.value)}>
                    </input>
                    <label htmlFor='status'>Status</label>
                    <select className={styles.select} id='status' ref={statusRef} value={editedStatus} onChange={(e) => setEditedStatus(e.target.value)}>
                        <option>Unfinished</option>
                        <option>Finished</option>
                    </select>
                    <div className={styles.modalButtons}>
                        <Button className={classes.green} type="button" onClick={editTodoHandler} >Edit Task</Button>
                        <Button className={classes.gray} type="button" onClick={toggleModal}>Cancel</Button>
                    </div>
                    <button className={styles.closeButton} style={{ backgroundImage: `url(${closeButton})` }} onClick={toggleModal}>
                    </button>

                </form>
            </div>
        </div>
    </>
}


export default EditToDo;
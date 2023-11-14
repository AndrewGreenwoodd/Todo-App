import styles from '../components/Todo.module.css'
import deleteButton from '../assets/delete.png'
import editButton from '../assets/edit.png'
import doneButton from '../assets/done.png'
import { useDispatch, useSelector } from 'react-redux'
import { todoActions } from '../store'
import EditToDo from './EditToDo'

interface ToDoProps {
    id?: number; 
    title?: string;
    finished?: string; 
    date?: string;
    isEmpty?: boolean
  }
  interface EditRootState {
    todo: {
      isEditing: boolean;
      editingTodo:{id?:number, name?: string, finished?:string};
    };
  }

const ToDo:React.FC<ToDoProps> = ({id,title,finished,date,isEmpty}) => {
  const dispatch = useDispatch();  
  const isEditModalOpen = useSelector((state: EditRootState) => state.todo.isEditing);
  const editingTodo = useSelector((state: EditRootState) => state.todo.editingTodo);

  const changeCompletion = (id:string) =>{
      dispatch(todoActions.toggleTodoStatus(id));
  }
  const toggleEditModal = () =>{
    dispatch(todoActions.setEditing({id:id, name:title, finished:finished}));
  } 
  const deleteTodo = (id:number) =>{
    dispatch(todoActions.deleteTodo(id));
  }
    const todoContent = isEmpty ? 'No Todos' : 
    <div className={styles.toDo} id={id?.toString()}>
      <div className={styles.check}>{finished}</div>
      <div className={styles.description}>
        <p>{title}</p>
        <p>{date}</p>
      </div>
      <div className={styles.toDoButtons}>
      <button style={{ backgroundImage: `url(${doneButton})` }} className={styles.toDoBtn} onClick={changeCompletion.bind(null, id!.toString())}></button>
        <button style={{ backgroundImage: `url(${editButton})` }} className={styles.toDoBtn} onClick={toggleEditModal}></button>
        <button style={{ backgroundImage: `url(${deleteButton})` }} className={styles.toDoBtn} onClick={deleteTodo.bind(null, id!)}></button>
      </div>
    </div>

    return <>
        {isEditModalOpen && <EditToDo  id={editingTodo.id} name={editingTodo.name} finished={editingTodo.finished}  />}
        <div className={styles.todo}>
           {todoContent}
        </div>
    </>
}


export default ToDo
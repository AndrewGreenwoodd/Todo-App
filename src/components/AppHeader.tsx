import Button from "../UI/Button"
import styles from '../UI/Button.module.css'
import classes from './AppHeader.module.css'
import { todoActions } from "../store"
import { useDispatch } from "react-redux/es/exports"
import { RootState } from "./NewTodo"
import { useSelector } from "react-redux/es/exports"

const AppHeader: React.FC = () => {
    const filter = useSelector((state: RootState) => state.todo.filter);
    const dispatch = useDispatch();
    const toggleModal = () => {
        dispatch(todoActions.toggleModal());
    }
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(todoActions.setFilter(e.target.value as 'All' | 'Unfinished' | 'Finished'));
    };
    return <>
        <div className={classes.headerWrapper}>
            <Button onClick={toggleModal} className={styles.green} id="test">Add Task</Button>
            <select className={classes.headerSelect}  onChange={handleChange} value={filter}>
                <option>All</option>
                <option>Unfinished</option>
                <option>Finished</option>
            </select>
        </div>
    </>
}

export default AppHeader
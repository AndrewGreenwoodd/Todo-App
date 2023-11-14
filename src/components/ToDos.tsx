import ToDo from "./ToDo"
import { useSelector } from "react-redux"
import { RootState } from "./NewTodo"
import { TodoItem } from "../store"

const ToDos:React.FC = () => {
  const items = useSelector((state :RootState) => state.todo.items) as TodoItem[]; 
  const filter = useSelector((state: RootState) => state.todo.filter);
  const filteredItems = items.filter(item => {
    if (filter === 'All') {
      return true;
    } else {
      return item.finished === filter;
    }
  });
  const itemsLength = filteredItems.length;

     return <>
         <div className="todosWrapper">
         {itemsLength === 0 ? <ToDo isEmpty/> :filteredItems.map(item =>
                <ToDo key={item.id} id={item.id} title={item.name} finished={item.finished} date={item.date}
                />)} 
         </div>
     </>
 }
 

 export default ToDos
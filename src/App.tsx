import './App.css'
import AppHeader from './components/AppHeader'
import ToDos from './components/ToDos'
import NewTodo from './components/NewTodo'
import { useSelector } from 'react-redux'

interface RootState {
  todo: {
    isModalOpen: boolean;
  };
}

function App() {
  const isModalOpen = useSelector((state :RootState) => state.todo.isModalOpen)
  return (
    <>
     <h1 className='header-title'>TODO LIST</h1>
     <main className='main-wrapper'>
     <AppHeader/>
     <ToDos/>
     {isModalOpen && <NewTodo/>}
     </main>
    </>
  )
}

export default App

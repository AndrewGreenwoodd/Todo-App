import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface TodoState {
    items: TodoItem[],
    isModalOpen: boolean,
    isEditing: boolean,
    editingTodo: object,
    filter: 'All' | 'Unfinished' | 'Finished';
}

export interface TodoItem {
    id: number;
    finished: string;
    name: string;
    date: string;
    editingTodo?: object
}

const getLocalStorageItems = (): TodoItem[] => {
    const storedItems = localStorage.getItem('todos');
    return storedItems ? JSON.parse(storedItems) : [];
}

const initialTodoState: TodoState = { items: getLocalStorageItems(), isModalOpen: false, isEditing: false, editingTodo: { id: null, name: null, finished: null }, filter: 'All' };

const toDoSlice = createSlice({
    name: 'todo',
    initialState: initialTodoState,
    reducers: {
        toggleModal(state) {
            state.isModalOpen = !state.isModalOpen;
        },
        addTodo(state, action: PayloadAction<TodoItem>) {
            const newItem = action.payload;
            state.items.push({
                id: newItem.id,
                finished: newItem.finished,
                name: newItem.name,
                date: newItem.date
            })
            localStorage.setItem('todos', JSON.stringify(state.items));
        },
        toggleTodoStatus(state, action: PayloadAction<string>) {
            const itemId = action.payload;
            const item = state.items.find((todo) => todo.id.toString() === itemId);
            if (item) {
                item.finished = item.finished === 'Finished' ? 'Unfinished' : 'Finished';
            }
            localStorage.setItem('todos', JSON.stringify(state.items));
        },
        setEditing(state, action: PayloadAction<{ id?: number; name?: string; finished?: string }>) {
            state.isEditing = !state.isEditing;
            state.editingTodo = action.payload || {};
        }
        ,
        editTodo(state, action: PayloadAction<{ id: number | undefined; name: string; finished: string }>) {
            const { id, name, finished } = action.payload;
            const itemToEdit = state.items.find((todo) => todo.id === id);
            if (itemToEdit) {
                itemToEdit.name = name;
                itemToEdit.finished = finished;
            }
            localStorage.setItem('todos', JSON.stringify(state.items));
        },
        deleteTodo(state, action: PayloadAction<number>) {
            const id = action.payload;
            console.log(id);
            const existingItem = state.items.find(item => item.id === Number(id));
            if (existingItem) {
                state.items = state.items.filter(item => item.id !== Number(id));
            }
            localStorage.setItem('todos', JSON.stringify(state.items));
        },
        setFilter(state, action: PayloadAction<'All' | 'Unfinished' | 'Finished'>) {
            state.filter = action.payload;
        }
    }
})

const store = configureStore({
    reducer: {
        todo: toDoSlice.reducer
    }
});

export const todoActions = toDoSlice.actions;

export default store;
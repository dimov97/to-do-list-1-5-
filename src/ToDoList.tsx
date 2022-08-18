import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {filterType, tasksType} from "./App";

type toDoListType = {
    id:string
    title: string
    tasks: tasksType[]
    removeTask: (id: string,todolistId:string) => void
    filterTasks: (value: filterType,todolistId:string) => void
    addNewTask: (newTitle: string,todolistId:string) => void
    changeTaskStatus: (id: string, isDone: boolean,todolistId:string) => void
    filter: filterType
    removeTodolist:(id:string)=>void
}

const ToDoList: React.FC<toDoListType> = ({
                                              title,
                                              tasks,
                                              removeTask,
                                              filterTasks,
                                              addNewTask,
                                              changeTaskStatus,
                                              filter,
                                              removeTodolist,
    id
                                          }) => {
    let [newTitle, setNewTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    const addNewTaskHandler = () => {
        if (newTitle.trim() !== '') {
            addNewTask(newTitle.trim(), id)
            setNewTitle('')
        } else {
            setError('Title is required !')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        setError('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNewTaskHandler()
        }
    }
    const onClickAllHandler = () => {
        filterTasks('all', id)
    }
    const onClickActiveHandler = () => {
        filterTasks('active', id)
    }
    const onClickCompleteHandler = () => {
        filterTasks('complete', id)
    }

    return (
        <div>
            <h3><button onClick={()=>{removeTodolist(id)}}>x</button> {title}</h3>
            <div>
                <input value={newTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addNewTaskHandler}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {tasks.map((t) => {
                    const onClickHandler = () => {
                        removeTask(t.id, id)
                    }
                    return (
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <button onClick={onClickHandler}>x</button>
                            <input type="checkbox" checked={t.isDone} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                let newTaskStatus = e.currentTarget.checked
                                changeTaskStatus(t.id, newTaskStatus, id)

                            }}/>
                            <span>{t.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={filter === 'all' ? 'active-filter' : ''} onClick={onClickAllHandler}>All</button>
                <button className={filter === 'active' ? 'active-filter' : ''} onClick={onClickActiveHandler}>Active
                </button>
                <button className={filter === 'complete' ? 'active-filter' : ''}
                        onClick={onClickCompleteHandler}>Completed
                </button>
            </div>
        </div>
    );
};

export default ToDoList;
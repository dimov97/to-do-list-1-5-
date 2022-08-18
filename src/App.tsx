import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";

export type tasksType = {
    id: string
    title: string
    isDone: boolean
}
type TasksStateType = {
    [key : string]:Array<tasksType>
}
export type filterType = 'all' | 'active' | 'complete'
export type todolistType = {
    id:string
    title:string
    filter: filterType
}

function App() {


    function filterTasks(value: filterType, todolistId:string) {
        let todolist = todolists.find(tl=> tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function addNewTask(newTitle: string, todolistId:string) {
        let task = {id: v1(), title: newTitle, isDone: false}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})
    }

    function removeTask(id: string,todolistId:string) {
        let todolistTasks= tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id)
        setTasks({...tasks})
    }

    function changeTaskStatus(id: string, isDone: boolean,todolistId:string) {
        let todolistTasks= tasks[todolistId]
        let taskStatus = todolistTasks.find(t => t.id === id)
        if (taskStatus) {
            taskStatus.isDone = isDone
            setTasks({...tasks})
        }

    }
    function removeTodolist (id:string) {
        setTodolists(todolists.filter(t=>t.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    let todolistsId1 = v1()
    let todolistsId2 = v1()

    let [todolists, setTodolists]= useState<Array<todolistType>>([
        {id:todolistsId1, title:'what ot learn ?', filter: 'all'},
        {id:todolistsId2, title:'what ot buy ?', filter: 'all'}
    ])
    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistsId1]:[{id: v1(), title: 'html', isDone: true},
            {id: v1(), title: 'css', isDone: true},
            {id: v1(), title: 'js', isDone: false}],
        [todolistsId2]:[{id: v1(), title: 'book', isDone: true},
            {id: v1(), title: 'milk', isDone: false}]
    })

    return (
        <div className="App">
            {todolists.map((tl)=> {
                let filteredTasks = tasks[tl.id]
                if (tl.filter === 'active')
                    filteredTasks = filteredTasks.filter(t => !t.isDone)
                if (tl.filter === 'complete')
                    filteredTasks = filteredTasks.filter(t => t.isDone)
                return(
                    <ToDoList
                              key={tl.id}
                              id={tl.id}
                        title={tl.title}
                              tasks={filteredTasks}
                              removeTask={removeTask}
                              filterTasks={filterTasks}
                              addNewTask={addNewTask}
                              changeTaskStatus={changeTaskStatus}
                              filter={tl.filter}
                              removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;

import React, { useState, useRef } from 'react'
import TodoItem from './TodoItem'
import Draggable from 'react-draggable';

type Nullable<T> = T | null

export type todoItemType = {
    id: number,
    deadline: string | null,
    todo_title: string,
    todo_desc: string,
    order_no: number,
    created_at: string
}

type todoBucketType = {
    todoArray: todoItemType[],
    addNewTodo: Function
}

export interface todoPostInterface {
    todo_title: string,
    todo_desc: string,
    order_no: Nullable<number>,
    deadline: Nullable<Date>
}

const TodoBucket: React.FC<todoBucketType> = ({ todoArray, addNewTodo }) => {

    const todoList = todoArray

    const inputRef = useRef<HTMLInputElement>(null)

    const [inputValue, setInputValue] = useState("")

    const handleAddNewTodo = async () => {

        const todoPostData = {
            todo_title: inputValue,
            todo_desc: "",
            order_no: 0,
            deadline: null
        }
        console.log(todoPostData)
        setInputValue("")

        console.log(await addNewTodo(todoPostData))
        console.log("FINISH")
    }

    return (
        <div className='rounded-md bg-lime-50 shadow-lg outline-gray-900 outline-4 p-4 min-h-fit'>
            {
                todoList.map((t: todoItemType, idx: number) => {
                    return (
                        <TodoItem key={idx} {...t} />
                    )
                })
            }
            <div>
                <input type='text' value={inputValue} onChange={(e) => { setInputValue(e.target.value) }}
                    className='w-full p-2 mb-2 shadow-slate-100 focus:outline focus:outline-2 focus:outline-gray-400 rounded-md' placeholder='New Todo' />
                <button onClick={handleAddNewTodo}
                    className='p-2 w-full bg-blue-400 text-white flex justify-center rounded-md shadow-sm'>
                    Add new Todo
                </button>
            </div>

        </div>
    )
}

export default TodoBucket
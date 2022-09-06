import React from 'react'
import { todoItemType } from './TodoBucket'
import Draggable from 'react-draggable'

const TodoItem: React.FC<todoItemType> = (props) => {

    const titleFormatted = props.todo_title.slice(0, 20) + (props.todo_title.length > 20 ? "...": "")

    return (
        <Draggable axis="y" bounds={{ top: -100, left: -100, right: 100, bottom: 100 }}>
            <div className='m-2 bg-slate-100 shadow-md p-4 pl-3 flex flex-row justify-between w-64'>
                <div className='overflow-hidden'>
                    <p className='text-2xl'>{titleFormatted}</p>
                    <p className='text-sm'>{(new Date(props.created_at)).toISOString()}</p>
                </div>
                <button className='bg-red-400 rounded shadow-md p-4 mx-2 h-4 flex items-center self-center' onClick={()=> props.deleteTodo(props.id)}>
                    -
                </button>
            </div>
        </Draggable>
    )
}

export default TodoItem
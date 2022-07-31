import React from 'react'
import { todoItemType } from './TodoBucket'
import Draggable from 'react-draggable'

const TodoItem: React.FC<todoItemType> = (props) => {

    return (
        <Draggable axis="y" bounds={{top: -100, left: -100, right: 100, bottom: 100}}>
            <div className='m-2 bg-slate-100 shadow-md p-4 pl-3'>
                <p className='text-2xl'>{props.todo_title}</p>
                <p className='text-sm'>{(new Date(props.created_at)).toISOString()}</p>
            </div> 
        </Draggable>
    )
}

export default TodoItem
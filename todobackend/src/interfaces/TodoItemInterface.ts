type Nullable<T> = T | null

export interface TodoItemProp {
    todo_title:string,
    todo_desc: string,
    order_no: Nullable<number>,
    deadline: Nullable<Date>
}

const todoItemShape = {
    todo_title: "",
    todo_desc: "",
    order_no: 0,
    deadline: null
}

export const checkTodoShape = (inputItem: any):boolean => {

    const todoKeys = Object.keys(todoItemShape)

    for(let i = 0; i < todoKeys.length; i++){
        console.log("ITEM", inputItem[todoKeys[i]], inputItem)
        if(typeof(inputItem[todoKeys[i]]) === 'undefined'){
            return false
        }
        // if(typeof(inputItem[todoKeys[i]]) !== typeof(todoItemShape[todoKeys[i]]))
        //     return false
    }
    return true
}

export const extractTodoItem = (inputItem:any):TodoItemProp => {
    const todoKeys = Object.keys(todoItemShape)
    const todoItem:any = {}

    todoKeys.map((key)=> {
        todoItem[key] = inputItem[key]
    })
    return todoItem
}
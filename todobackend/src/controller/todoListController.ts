import { viewAllTodos, addNewTodo, updateTodo, deleteTodo } from "../service/todoCrudService";
import { TodoItemProp } from "../interfaces/TodoItemInterface";

export class TodoController {
    viewAll = ()=> viewAllTodos()
    addNew = async(props:TodoItemProp)=> await addNewTodo(props)
    updateExisting = async(props:TodoItemProp, todoId:number) => await updateTodo(props, todoId)
    deleteExisting = async(todoId:number) => await deleteTodo(todoId)
}
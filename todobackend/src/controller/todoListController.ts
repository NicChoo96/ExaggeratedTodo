import { viewAllTodos, addNewTodo, updateTodo, deleteTodo } from "../service/todoCrudService";
import { TodoItemProp } from "../interfaces/TodoItemInterface";

export class TodoController {
    viewAll = ()=> viewAllTodos()
    addNew = (props:TodoItemProp)=> addNewTodo(props)
    updateExisting = (props:TodoItemProp, todoId:number) => updateTodo(props, todoId)
    deleteExisting = (todoId:number) => deleteTodo(todoId)
}
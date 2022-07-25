import { TodoList } from "../entity/ListEntity";
import { AppDataSource } from "../data-source";
import { TodoItemProp } from "../interfaces/TodoItemInterface";

const todoListRepository = AppDataSource.getRepository(TodoList)

export const viewAllTodos = ()=> {
    // const todoList = await dataSource
    // .getRepository(TodoList)
    // .createQueryBuilder("todoList")
    // .where("todoList.id = :id", { id: 1 })
    // .getOne()
    return TodoList.find()
}

export const addNewTodo = async(props: TodoItemProp)=> {
    
    return await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(TodoList)
        .values(props)
        .execute()
}

export const updateTodo = async(props: TodoItemProp, todoId:number) => {
    return await AppDataSource
        .createQueryBuilder()
        .update(TodoList)
        .set(props)
        .where(`id = :id`, {id: todoId})
        .execute()
}

export const deleteTodo = async(todoId:number) => {
    return await AppDataSource
        .createQueryBuilder()
        .delete()
        .from(TodoList)
        .where("id = :id", { id: todoId })
        .execute()
}
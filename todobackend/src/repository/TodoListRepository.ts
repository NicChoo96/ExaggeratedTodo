import { AppDataSource } from "../data-source";
import { TodoList } from "../entity/ListEntity";

export const todoListRepository = AppDataSource.getRepository(TodoList)

export const testDemoItem = async()=> {
    const todoListRepository =  AppDataSource.getRepository(TodoList)

    const todoItem = new TodoList()
    todoItem.order_no = 2
    todoItem.todo_title = "Testing 2 Title"
    todoItem.todo_desc = "Testing 2 Description"
    
    await todoListRepository.save(todoItem)
    // console.log(todoListRepository)

    const allItems = await TodoList.find()

    console.log(allItems)

    const firstitem = await TodoList.findOneBy({
        id: 1,
    }) // find by id

    const testingTitle = await TodoList.findOneBy({
        todo_title: "Testing 1 Title"
    }) // find by firstName and lastName

    return {
        allItems,
        firstitem,
        testingTitle
    }
}

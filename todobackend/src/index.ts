import type { Request, Response } from 'express';
import * as express from 'express'
import { AppDataSource } from './data-source';
import { TodoController } from './controller/todoListController';
import { validate } from 'class-validator';
import { checkTodoShape, extractTodoItem } from './interfaces/TodoItemInterface';

const app = express()
app.use(express.json());
const port = 3001
let isConnected = false;

AppDataSource.initialize().then(async () => {
  isConnected = true;
}).catch(error => console.log(error))

const todoController = new TodoController()

app.get('/', async (req: Request, res: Response) => {
  if (isConnected) {
    res.send("Connection is UP")
  } else {
    res.send("Server is not connected to the database!")
  }
  // res.send('Hello World, my name is JEFF')
})

app.get('/api/view', async (req: Request, res: Response) => {
  if (!isConnected) {
    res.send("Server is not connected to the database!")
    return
  }

  const result = await todoController.viewAll()
  res.send(result)

})

app.get('/api/add', async (req: Request, res: Response) => {

  if (!req.body) {
    res.send({ error: "Forbidden input", status: 403 })
    return
  }

  if (!isConnected) {
    res.send("Server is not connected to the database!")
    return
  }

  const input = req.body

  if (!checkTodoShape(input)) {
    res.send({ error: "Forbidden input", status: 403 })
    return
  }
  
  const result = await todoController.addNew(input)
  res.send(result)


})

app.get('/api/update', async (req: Request, res: Response) => {

  if (!req.body) {
    res.send({ error: "Forbidden input", status: 403 })
    return
  }

  if (!isConnected) {
    res.send("Server is not connected to the database!")
    return
  }

  const input = req.body
  if (!checkTodoShape(input)) {
    res.send({ error: "Forbidden input", status: 403 })
    return
  }

  const inputTodo = extractTodoItem(input)
  const result = await todoController.updateExisting(inputTodo, input.todoId)
  res.send(result)


})

app.get('/api/delete', async (req: Request, res: Response) => {
  if (req.body) {
    if (isConnected) {
      const input = req.body

      const result = await todoController.deleteExisting(input.todoId)
      res.send(result)
      return
    } else {
      res.send("Server is not connected to the database!")
    }
    // res.send('Hello World, my name is JEFF')
  } else {
    res.send({ error: "Forbidden input", status: 403 })
  }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

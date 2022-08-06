import type { Request, Response } from 'express';
import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import { AppDataSource } from './data-source';
import { TodoController } from './controller/todoListController';
import { validate } from 'class-validator';
import { checkTodoShape, extractTodoItem } from './interfaces/TodoItemInterface';

let corsOptions = {
  "origin": '*',
  "Access-Control-Allow-Origin": "*"
}

const app = express()
app.use(cors(corsOptions))
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(bodyParser.json())
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
    res.status(500).send("Server is not connected to the database!")
  }
  // res.send('Hello World, my name is JEFF')
})

app.get('/api/view', async (req: Request, res: Response) => {
  if (!isConnected) {
    res.status(500).send("Server is not connected to the database!")
    return
  }

  const result = await todoController.viewAll()
  res.send(result)

})

app.post('/api/add', async (req: Request, res: Response) => {

  if (!req.body) {
    res.status(403).send("Body Forbidden input")
    return
  }

  if (!isConnected) {
    res.status(500).send("Server is not connected to the database!")
    return
  }

  const input = req.body

  console.log(input)

  if (!checkTodoShape(input)) {
    res.status(403).send("Shape Forbidden input")
    return
  }

  const result = await todoController.addNew(input)
  res.send(result)


})

app.post('/api/update', async (req: Request, res: Response) => {

  if (!req.body) {
    res.status(403).send("Body Forbidden input")
    return
  }

  if (!isConnected) {
    res.status(500).send("Server is not connected to the database!")
    return
  }

  const input = req.body
  if (!checkTodoShape(input)) {
    res.status(403).send("Shape Forbidden input")
    return
  }

  const inputTodo = extractTodoItem(input)
  const result = await todoController.updateExisting(inputTodo, input.todoId)
  res.send(result)
})

app.post('/api/delete', async (req: Request, res: Response) => {
  if (!req.body) {
    res.status(403).send("Body Forbidden input")
    return
  }

  if (!isConnected) {
    res.status(500).send("Server is not connected to the database!")
    return
  }

  const input = req.body

  const result = await todoController.deleteExisting(input.todoId)
  res.send(result)
  return
  // res.send('Hello World, my name is JEFF')

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

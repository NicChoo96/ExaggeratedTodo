import type { Request, Response } from 'express';
import * as express from 'express'
import { AppDataSource } from './data-source';
import { TodoController } from './controller/todoListController';
import { validate } from 'class-validator';

const app = express()
const port = 3001
let isConnected = false;

AppDataSource.initialize().then(async () => {
  isConnected = true;
}).catch(error => console.log(error))

const todoController = new TodoController()

app.get('/', async (req: Request, res: Response) => {
  if (isConnected) {
    const input = req.body
    
    const result = await todoController.viewAll()
    res.send(result)
  } else {
    res.send("Server is not connected to the database!")
  }
  // res.send('Hello World, my name is JEFF')
})

app.get('/', async (req: Request, res: Response) => {
  if (req.body)
    if (isConnected) {
      const result = await todoController.viewAll()
      res.send(result)
    } else {
      res.send("Server is not connected to the database!")
    }
  // res.send('Hello World, my name is JEFF')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

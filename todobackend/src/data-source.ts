import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { TodoList } from "./entity/ListEntity"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "db",
    port: parseInt(process.env.MYSQL_PORT) || 9906,
    username: "root",
    password: process.env.MYSQL_ROOT_PASSWORD || "mysqlpassword",
    database: process.env.MYSQL_DATABASE || "todo_db",
    synchronize: true,
    logging: true,
    entities: [TodoList],
    subscribers: [],
    migrations: []
})

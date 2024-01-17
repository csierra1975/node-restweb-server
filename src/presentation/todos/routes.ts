import { Router } from "express"
import { TodosController } from "./controller"
import { TodoDatasourceImpl } from "../../infrastructure/datasource/todo.datasource.impl"
import { TodoRepositoryImpl } from "../../infrastructure/datasource/repositories/todo.repository"

export class TodosRoutes {

    static get routes(): Router {

        const router = Router()
        
        const datasoure = new TodoDatasourceImpl()
        const todoRepository = new TodoRepositoryImpl(datasoure)
        const todoController = new TodosController(todoRepository)

        router.get('/', todoController.getTodos)
        router.get('/:id', todoController.getTodoById)
        router.post('/', todoController.createTodo)
        router.put('/:id', todoController.updateTodo)
        router.delete('/:id', todoController.deleteTodo)
        //router.get('/api/todos', (req, res) => todoController.getTodos(req, res))
        
        return router
    }
}
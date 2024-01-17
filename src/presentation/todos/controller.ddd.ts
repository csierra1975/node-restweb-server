import {Request, Response} from 'express'
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos'
import { TodoRepository } from '../../domain'

export class TodosController {

    //* DI
        constructor(
            private readonly todoRepository: TodoRepository
        ) {}

        public getTodos = async (req:Request, res:Response) => {

            const todos = await this.todoRepository.getAll()

            return res.json(todos)
        }

        public getTodoById = async(req:Request, res:Response) => {

            const id = +req.params.id // convierte a numero

            try{
                const todo = await this.todoRepository.findById(id)
                res.json(todo)
            }
            catch(error) {
                res.status(404).json({error : error})
            }
        }

        public createTodo =  async(req:Request, res:Response) => {

            const [error, createTodoDto] = CreateTodoDto.create(req.body)
            if (error) return res.status(400).json({ error: error})

            const todo = await this.todoRepository.create(createTodoDto!)

            res.json(todo)
        }

        public updateTodo =  async(req:Request, res:Response) => {

            const id = +req.params.id 
            const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id})
            if (error) return res.status(400).json({ error: error})
            
            if (error) return res.status(400).json({error})

            const todoEntity = await this.todoRepository.updateById(updateTodoDto!)

            res.json(todoEntity)
        }

        public deleteTodo =  async (req:Request, res:Response) => {

            const id = +req.params.id 
           
            const deletedEntity = await this.todoRepository.deleteById(id)
            res.json(deletedEntity)
        }
    }

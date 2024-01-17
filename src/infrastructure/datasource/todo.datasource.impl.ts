import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";


export class TodoDatasourceImpl implements TodoDatasource {

    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        
        const todo = await prisma.todo.create({
            data: createTodoDto!
        })

        return TodoEntity.fromObject(todo) 
    }

    async getAll(): Promise<TodoEntity[]> {

        const todos = await prisma.todo.findMany({})
        
        return todos.map(todo => TodoEntity.fromObject(todo))
    }

    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({
            where: { id }
        })

        if (!todo)  throw `Todo with id ${id} not found`

        return TodoEntity.fromObject(todo)
    }

    async updateById(updatedTodo: UpdateTodoDto): Promise<TodoEntity> {
        
        const todo = await this.findById(updatedTodo.id)

        const todoEntity = await prisma.todo.update({
            where: {id: todo.id},
            data: updatedTodo!.values
        })

        return TodoEntity.fromObject(todoEntity)
    }

    async deleteById(id: number): Promise<TodoEntity> {

        const todo = await this.findById(id)

        const todoEntityDeleted = await prisma.todo.delete({
            where: { id }
        })

        return TodoEntity.fromObject(todoEntityDeleted)
    }
}
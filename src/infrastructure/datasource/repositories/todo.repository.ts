import { CreateTodoDto, TodoDatasource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../../domain";


export class TodoRepositoryImpl implements TodoRepository {

    constructor (private readonly datasoure: TodoDatasource){}

    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.datasoure.create(createTodoDto)
    }

    getAll(): Promise<TodoEntity[]> {
        return this.datasoure.getAll()
    }

    findById(id: number): Promise<TodoEntity> {
        return this.datasoure.findById(id)
    }

    updateById(updatedTodo: UpdateTodoDto): Promise<TodoEntity> {
        return this.datasoure.updateById(updatedTodo)
    }

    deleteById(id: number): Promise<TodoEntity> {
        return this.datasoure.deleteById(id)
    }
}
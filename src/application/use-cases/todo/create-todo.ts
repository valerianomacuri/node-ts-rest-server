import { CreateTodoDto } from "../../../domain/dtos/todos";
import { TodoEntity } from "../../../domain/entities";
import { TodoRepository } from "../../../domain/repositories";

export interface CreateTodoUseCase {
  execute(dto: CreateTodoDto): Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}
  execute(dto: CreateTodoDto): Promise<TodoEntity> {
    return this.repository.create(dto);
  }
}

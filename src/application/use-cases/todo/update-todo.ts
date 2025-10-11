import { UpdateTodoDto } from "../../../domain/dtos/todos";
import { TodoEntity } from "../../../domain/entities";
import { TodoRepository } from "../../../domain/repositories";

export interface UpdateTodoUseCase {
  execute(dto: UpdateTodoDto): Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}
  execute(dto: UpdateTodoDto): Promise<TodoEntity> {
    return this.repository.updateById(dto);
  }
}

import { TodoEntity } from "../../../domain/entities";
import { TodoRepository } from "../../../domain/repositories";

export interface GetTodoUseCase {
  execute(id: number): Promise<TodoEntity>;
}

export class GetTodo implements GetTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}
  execute(id: number): Promise<TodoEntity> {
    return this.repository.findById(id);
  }
}

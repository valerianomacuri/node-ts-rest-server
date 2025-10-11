import { TodoEntity } from "../../../domain/entities";
import { TodoRepository } from "../../../domain/repositories";

export interface DeleteTodoUseCase {
  execute(id: number): Promise<TodoEntity>;
}

export class DeleteTodo implements DeleteTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}
  execute(id: number): Promise<TodoEntity> {
    return this.repository.deleteById(id);
  }
}

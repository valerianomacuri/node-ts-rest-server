import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTodoDto, UpdateTodoDto } from "../../../../domain/dtos/todos";
import {
  CreateTodo,
  DeleteTodo,
  GetTodo,
  GetTodos,
  UpdateTodo,
} from "../../../../application/use-cases/todo";
import { TodoRepository } from "../../../../domain/repositories";

export class TodoController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const todos = await new GetTodos(this.todoRepository).execute();
      return reply.code(200).send(todos);
    } catch (error) {
      req.log.error(error);
      return reply.code(400).send({ error });
    }
  };

  public getTodoById = async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const id = +req.params.id;
      const todo = await new GetTodo(this.todoRepository).execute(id);
      return reply.code(200).send(todo);
    } catch (error) {
      req.log.error(error);
      return reply.code(400).send({ error });
    }
  };

  public createTodo = async (
    req: FastifyRequest<{ Body: Record<string, any> }>,
    reply: FastifyReply
  ) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return reply.code(400).send({ error });

    try {
      const todo = await new CreateTodo(this.todoRepository).execute(
        createTodoDto!
      );
      return reply.code(201).send(todo);
    } catch (error) {
      req.log.error(error);
      return reply.code(400).send({ error });
    }
  };

  public updateTodo = async (
    req: FastifyRequest<{ Params: { id: string }; Body: Record<string, any> }>,
    reply: FastifyReply
  ) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
    if (error) return reply.code(400).send({ error });

    try {
      const todo = await new UpdateTodo(this.todoRepository).execute(
        updateTodoDto!
      );
      return reply.code(200).send(todo);
    } catch (error) {
      req.log.error(error);
      return reply.code(400).send({ error });
    }
  };

  public deleteTodo = async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    const id = +req.params.id;
    try {
      const todo = await new DeleteTodo(this.todoRepository).execute(id);
      return reply.code(200).send(todo);
    } catch (error) {
      req.log.error(error);
      return reply.code(400).send({ error });
    }
  };
}

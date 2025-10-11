import { FastifyInstance } from "fastify";
import { TodoController } from "../controllers/todo.controller";
import { PostgresTodoRepository } from "../../../repositories/postgres-todo.repository";

export class TodoRoutes {
  static async register(fastify: FastifyInstance) {
    const todoRepository = new PostgresTodoRepository();
    const todoController = new TodoController(todoRepository);
    fastify.get("/", todoController.getTodos);
    fastify.get("/:id", todoController.getTodoById);
    fastify.post("/", todoController.createTodo);
    fastify.put("/:id", todoController.updateTodo);
    fastify.delete("/:id", todoController.deleteTodo);
  }
}

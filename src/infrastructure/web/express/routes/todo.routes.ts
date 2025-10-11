import { Router } from "express";
import { TodoController } from "../controllers/todo.controller";
import { PostgresTodoRepository } from "../../../repositories/postgres-todo.repository";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    const todoRepository = new PostgresTodoRepository();
    const todoController = new TodoController(todoRepository);
    router.get("/", todoController.getTodos);
    router.get("/:id", todoController.getTodoById);
    router.post("/", todoController.createTodo);
    router.put("/:id", todoController.updateTodo);
    router.delete("/:id", todoController.deleteTodo);
    return router;
  }
}

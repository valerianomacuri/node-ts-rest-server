import { Router } from "express";
import { TodoController } from "./controller";
import {
  createTodoValidator,
  deleteTodoValidator,
  getTodoByIdValidator,
  updateTodoValidator,
} from "./validators";
import { validateRequest } from "./middleware";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    const todoController = new TodoController();
    router.get("/", todoController.getTodos);
    router.get(
      "/:id",
      getTodoByIdValidator,
      validateRequest,
      todoController.getTodoById
    );
    router.post(
      "/",
      createTodoValidator,
      validateRequest,
      todoController.createTodo
    );

    router.put(
      "/:id",
      updateTodoValidator,
      validateRequest,
      todoController.updateTodo
    );

    router.delete(
      "/:id",
      deleteTodoValidator,
      validateRequest,
      todoController.deleteTodo
    );
    return router;
  }
}

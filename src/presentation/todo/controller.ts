import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Buy milk", completedAt: new Date() },
  { id: 2, text: "Buy bread", completedAt: null },
  { id: 3, text: "Buy butter", completedAt: new Date() },
];

export class TodoController {
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    try {
      const todo = todos.find((todo) => todo.id === id);
      todo
        ? res.json(todo)
        : res.status(404).json({ error: `Todo with id ${id} not found` });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
    return;
  };

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;

    try {
      const newTodo = {
        id: todos.length + 1,
        text,
        completedAt: null,
      };
      todos.push(newTodo);
      res.status(201).json(req.body);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const todo = todos.find((todo) => todo.id === id);
    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });
    const { text, completedAt } = req.body;
    todo.text = text || todo.text;
    completedAt === null
      ? (todo.completedAt = null)
      : (todo.completedAt = new Date(completedAt));
    res.status(200).json(todo);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const todo = todos.find((todo) => todo.id === id);
    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });
    todos.splice(todos.indexOf(todo), 1);
    return res.json(todo);
  };
}

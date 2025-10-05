import { body, param } from "express-validator";

export const getTodoByIdValidator = [
  param("id")
    .exists()
    .withMessage("ID is required")
    .isInt({ gt: 0 })
    .withMessage("ID must be a positive integer"),
];

export const createTodoValidator = [
  body("text")
    .notEmpty()
    .withMessage("Text is required")
    .isString()
    .withMessage("Text must be a string"),
  body("created").optional().isDate().withMessage("Created must be a date"),
];

export const updateTodoValidator = [
  ...getTodoByIdValidator,
  ...createTodoValidator,
];

export const deleteTodoValidator = [...getTodoByIdValidator];

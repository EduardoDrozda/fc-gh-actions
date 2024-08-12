import { describe, expect, it, vi } from "vitest";
import { Todo } from "../models/todo.model.mjs";
import { TodoService } from "./todo.service.mjs";

describe("TodoService", () => {
  const todoRepository = {
    create: vi.fn().mockImplementation(() => new Todo(1, "Mock Title", false)),
    findAll: vi
      .fn()
      .mockImplementation(() => [new Todo(1, "Mock Title", false)]),
    findById: vi
      .fn()
      .mockImplementation(() => new Todo(1, "Mock Title", false)),
    update: vi.fn().mockImplementation(() => new Todo(1, "Mock Title", false)),
    delete: vi.fn().mockImplementation(() => true),
  };

  const todoService = new TodoService({ todoRepository });

  it("should be defined", () => {
    expect(todoService).toBeDefined();
  });

  it("should create a new todo", async () => {
    const todo = new Todo(1, "Mock Title", false);

    todoRepository.create.mockReturnValueOnce(todo);

    const result = await todoService.create(todo);

    expect(result).toEqual(todo);
  });

  it("should find all todos", async () => {
    const todos = [new Todo(1, "Mock Title", false)];

    todoRepository.findAll.mockReturnValueOnce(todos);

    const result = await todoService.findAll({ perPage: 10, page: 1 });

    expect(result).toEqual(todos);
  });

  it("should find a todo by id", async () => {
    const todo = new Todo(1, "Mock Title", false);

    todoRepository.findById.mockReturnValueOnce(todo);

    const result = await todoService.findById(1);

    expect(result).toEqual(todo);
  });

  it("should not find a todo by id", async () => {
    todoRepository.findById.mockReturnValueOnce(null);

    await expect(todoService.findById(1)).rejects.toThrow("Todo not found");
  });

  it("should update a todo", async () => {
    const todo = new Todo(1, "Mock Title", false);

    todoRepository.update.mockReturnValueOnce(todo);

    const result = await todoService.update(1, todo);

    expect(result).toEqual(todo);
  });

  it("should done a todo", async () => {
    const todo = new Todo(1, "Mock Title", false);

    todoRepository.findById.mockReturnValueOnce(todo);

    todo.done = true;

    todoRepository.update.mockReturnValueOnce(todo);

    const result = await todoService.doneTodo(1);

    expect(result).toEqual(todo);
  });

  it("should delete a todo", async () => {
    todoRepository.delete.mockReturnValueOnce(true);

    const result = await todoService.delete(1);

    expect(result).toBe(true);
  });

  it("should not done a todo if not found", async () => {
    todoRepository.findById.mockReturnValueOnce(null);

    await expect(todoService.doneTodo(1)).rejects.toThrow("Todo not found");
  });

  it("should not delete a todo if not found", async () => {
    todoRepository.findById.mockReturnValueOnce(null);

    await expect(todoService.delete(1)).rejects.toThrow("Todo not found");
  });
});

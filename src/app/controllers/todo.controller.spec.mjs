import { describe, expect, it, vi } from "vitest";
import { TodoController } from "./todo.controller.mjs";
import { Todo } from "../models/todo.model.mjs";

describe("TodoController", () => {
  const todoService = {
    create: vi.fn().mockImplementation(() => new Todo(1, "Mock Title", false)),
    findAll: vi
      .fn()
      .mockImplementation(() => [new Todo(1, "Mock Title", false)]),
    findById: vi
      .fn()
      .mockImplementation(() => new Todo(1, "Mock Title", false)),
    update: vi.fn().mockImplementation(() => new Todo(1, "Mock Title", false)),
    doneTodo: vi.fn().mockImplementation(() => new Todo(1, "Mock Title", true)),
    delete: vi.fn().mockImplementation(() => true),
  };

  const todoController = new TodoController({ todoService });

  it("should be defined", () => {
    expect(todoController).toBeDefined();
  });

  it("should create a new todo", async () => {
    const request = { body: { title: "Mock Title" } };

    const response = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };

    await todoController.create(request, response);

    expect(todoService.create).toHaveBeenCalledTimes(1);
  });

  it("should find all todos", async () => {
    const request = { query: { perPage: 10, page: 1 } };

    const response = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };

    await todoController.findAll(request, response);

    expect(todoService.findAll).toHaveBeenCalledTimes(1);
    expect(todoService.findAll).toHaveBeenCalledWith({ perPage: 10, page: 1 });
  });

  it("should find a todo by id", async () => {
    const request = { params: { id: 1 } };

    const response = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };

    await todoController.findById(request, response);

    expect(todoService.findById).toHaveBeenCalledTimes(1);
  });

  it("should update a todo", async () => {
    const request = { params: { id: 1 }, body: { title: "Mock Title" } };

    const response = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };

    await todoController.update(request, response);

    expect(todoService.update).toHaveBeenCalledTimes(1);
  });

  it("should mark a todo as done", async () => {
    const request = { params: { id: 1 } };

    const response = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };

    await todoController.done(request, response);

    expect(todoService.doneTodo).toHaveBeenCalledTimes(1);
  });

  it("should delete a todo", async () => {
    const request = { params: { id: 1 } };

    const response = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };

    await todoController.delete(request, response);

    expect(todoService.delete).toHaveBeenCalledTimes(1);
  });
});

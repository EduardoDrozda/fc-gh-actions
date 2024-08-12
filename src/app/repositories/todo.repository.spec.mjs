import { describe, expect, it } from "vitest";
import { TodoRepository } from "./todo.repository.mjs";

describe("TodoRepository", () => {
  const todoRepository = new TodoRepository();

  it("should be defined", () => {
    expect(todoRepository).toBeDefined();
  });

  it("should create a new todo", async () => {
    const todo = { title: "Mock Title", description: "Mock Description" };

    const result = await todoRepository.create(todo);

    expect(result).toEqual({ id: 1, ...todo, done: false });
  });

  it("should find all todos", async () => {
    const result = await todoRepository.findAll({ perPage: 10, page: 1 });

    expect(result).toEqual({
      data: [{ id: 1, title: "Mock Title", description: "Mock Description", done: false }],
      meta: { total: 1, totalPage: 1, page: 1, perPage: 10 },
    });
  });

  it("should find a todo by id", async () => {
    const result = await todoRepository.findById(1);

    expect(result).toEqual({ id: 1, title: "Mock Title", description: "Mock Description", done: false });
  });

  it("should update a todo", async () => {
    const todo = { title: "Mock Title", description: "Mock Description" };

    const result = await todoRepository.update(1, todo);

    expect(result).toEqual({ id: 1, ...todo, done: false });
  });

  it("should delete a todo", async () => {
    const result = await todoRepository.delete(1);

    expect(result).toEqual({ id: 1, title: "Mock Title", description: "Mock Description", done: false });
  });
});
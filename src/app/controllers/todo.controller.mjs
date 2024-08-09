import { z } from "zod";
import { TodoRepository } from "../repositories/todo.repository.mjs";
import { TodoService } from "../services/todo.service.mjs";

const TodoSchema = z.object({
  title: z.string().min(1),
});

export class TodoController {
  constructor({ todoService }) {
    this.todoService = todoService;

    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.update = this.update.bind(this);
    this.done = this.done.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(request, response) {
    const validation = TodoSchema.safeParse(request.body);

    if (!validation.success) {
      return response
        .status(400)
        .json({ message: "Invalid data", errors: validation.error });
    }

    const todo = await this.todoService.create(request.body);
    return response.status(201).json(todo);
  }

  async findAll(requests, response) {
    const { perPage, page } = requests.query;

    const todos = await this.todoService.findAll({ perPage, page });
    return response.status(200).json(todos);
  }

  async findById(request, response) {
    const { id } = request.params;
    const todo = await this.todoService.findById(id);

    if (!todo) {
      return response.status(404).json({ message: "Todo not found" });
    }

    return response.status(200).json(todo);
  }

  async update(request, response) {
    const { id } = request.params;
    const validation = TodoSchema.safeParse(request.body);

    if (!validation.success) {
      return response
        .status(400)
        .json({ message: "Invalid data", errors: validation.error });
    }

    const todo = await this.todoService.update(id, request.body);
    return response.status(200).json(todo);
  }

  async done(request, response) {
    const { id } = request.params;

    try {
      const todo = await this.todoService.doneTodo(id);
      return response.status(200).json(todo);
    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }

  async delete(request, response) {
    const { id } = request.params;
    const todo = await this.todoService.delete(id);

    if (!todo) {
      return response.status(404).json({ message: "Todo not found" });
    }

    return response.status(200).json(todo);
  }
}

const todoRepository = new TodoRepository();
const todoService = new TodoService({ todoRepository });
const todoController = new TodoController({ todoService });

export default todoController;

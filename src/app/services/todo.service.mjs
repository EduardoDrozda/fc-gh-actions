export class TodoService {
  constructor({ todoRepository }) {
    this.todoRepository = todoRepository;
  }

  async create(todo) {
    return this.todoRepository.create(todo);
  }

  async findAll({ perPage = 5, page = 1 }) {
    return this.todoRepository.findAll({ perPage, page });
  }

  async findById(id) {
    return this.todoRepository.findById(id);
  }

  async update(id, todo) {
    return this.todoRepository.update(id, {
      title: todo.title,
      description: todo.description,
    });
  }

  async doneTodo(id) {
    const todo = await this.todoRepository.findById(id);

    if (!todo) {
      throw new Error("Todo not found");
    }

    todo.done = true;
    return this.todoRepository.update(id, todo);
  }

  async delete(id) {
    return this.todoRepository.delete(id);
  }
}

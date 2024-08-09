import { Todo } from "../models/todo.model.mjs";

export class TodoRepository {
  constructor() {
    this.todos = [];
  }

  async create(todo) {
    return new Promise((resolve) => {
      const newTodo = new Todo({
        id: this.todos.length + 1,
        done: false,
        ...todo,
      });
      this.todos.push(newTodo);
      resolve(newTodo);
    });
  }

  async findAll({ perPage, page }) {
    return new Promise((resolve) => {
      const start = (page - 1) * perPage;
      const end = start + perPage;

      resolve({
        data: this.todos.slice(start, end),
        meta: {
          total: this.todos.length,
          totalPage: Math.ceil(this.todos.length / perPage),
          page,
          perPage,
        },
      });
    });
  }

  async findById(id) {
    return new Promise((resolve) => {
      const todo = this.todos.find((todo) => todo.id === Number(id));

      resolve(todo);
    });
  }

  async update(id, todo) {
    return new Promise((resolve) => {
      const index = this.todos.findIndex((todo) => todo.id === Number(id));
      this.todos[index] = {
        ...this.todos[index],
        ...todo,
      };

      resolve(this.todos[index]);
    });
  }

  async delete(id) {
    return new Promise((resolve) => {
      const index = this.todos.findIndex((todo) => todo.id === id);
      const todo = this.todos[index];
      this.todos.splice(index, 1);
      resolve(todo);
    });
  }
}

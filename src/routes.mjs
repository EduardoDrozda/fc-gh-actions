import express from "express";
import todoController from "./app/controllers/todo.controller.mjs";

const routes = express.Router();

routes.post("/todos", todoController.create);
routes.get("/todos", todoController.findAll);
routes.get("/todos/:id", todoController.findById);
routes.put("/todos/:id", todoController.update);
routes.patch("/todos/:id/done", todoController.done);
routes.delete("/todos/:id", todoController.delete);

export default routes;

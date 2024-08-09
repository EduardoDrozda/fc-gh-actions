import express from "express";

import env from "../config/enviroments.mjs";
import routes from "../routes.mjs";

export default class Application {
  constructor() {
    this.app = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/api', routes);
  }

  startup() {
    const { APP_PORT } = env;
    
    this.app.listen(APP_PORT, () =>
      console.log(
        `⚡️ [server]: Server is running at https://localhost:${APP_PORT} ⚡️`
      )
    );
  }
}

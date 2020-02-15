import express from 'express';
import routes from './routes';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    // habilita o uso de json
    this.server.use(express.json());
  }

  routes() {
    // importa as rotas da aplicação
    this.server.use(routes);
  }
}

// Exporta uma instancia de App
export default new App().server;

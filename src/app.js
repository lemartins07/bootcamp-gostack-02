import express from 'express';
import path from 'path';
import routes from './routes';
import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    // habilita o uso de json
    this.server.use(express.json());
    // configura o server para fornecer arquivos estáticos, como as imagens.
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    // importa as rotas da aplicação
    this.server.use(routes);
  }
}

// Exporta uma instancia de App
export default new App().server;

const express = require('express');
var cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersRoutePath = '/api/users';

    // Middlewares
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    //Lectura y parseo del body
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }
  routes() {
    this.app.use(this.usersRoutePath, require('../routes/user.route'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto ${this.port}`);
    });
  }
}

module.exports = Server;

const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersRoutePath = '/api/users';
    this.authPath = '/api/auth';
    // Connect DB
    this.dbConnect();

    // Middlewares
    this.middlewares();
    this.routes();
  }

  async dbConnect() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    //Lectura y parseo del body
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }
  routes() {
    this.app.use(this.authPath, require('../routes/auth.route.js'));
    this.app.use(this.usersRoutePath, require('../routes/user.route'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server Runner in Port ${this.port}...`);
    });
  }
}

module.exports = Server;

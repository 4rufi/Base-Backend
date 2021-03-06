const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: '/api/auth',
      categories: '/api/categories',
      find: '/api/find',
      products: '/api/products',
      uploads: '/api/uploads',
      users: '/api/users',
    };
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
    //Cors
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    // Directorio publico
    this.app.use(express.static('public'));

    // Fileupload - Carga de archivo
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp',
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth.route.js'));
    this.app.use(this.paths.categories, require('../routes/categories.route'));
    this.app.use(this.paths.find, require('../routes/find.route'));
    this.app.use(this.paths.products, require('../routes/products.route'));
    this.app.use(this.paths.uploads, require('../routes/uploads.route'));
    this.app.use(this.paths.users, require('../routes/users.route'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server Runner in Port ${this.port}...`);
    });
  }
}

module.exports = Server;

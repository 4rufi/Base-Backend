const auth = require('./auth');
const categories = require('./categories');
const products = require('./products');
const users = require('./users');
const find = require('./find');
const uploads = require('./uploads');

module.exports = {
  ...auth,
  ...categories,
  ...find,
  ...products,
  ...users,
  ...uploads,
};

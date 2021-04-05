const { response } = require('express');
const {
  findUsers,
  findCategories,
  findProducts,
  findProductByCat,
} = require('../helpers');

const allowedCollections = ['categories', 'products', 'roles', 'users'];

const find = async (req, res = response) => {
  const { collection, terms } = req.params;
  if (!allowedCollections.includes(collection))
    return res
      .status(400)
      .json({ message: `Allowed collections: ${allowedCollections}` });

  switch (collection) {
    case 'users':
      findUsers(terms, res);
      break;
    case 'categories':
      findCategories(terms, res);
      break;
    case 'products':
      findProducts(terms, res);
      break;
    default:
      return res.status(500).json({ message: `Find not allowed` });
  }
};

const findProductsCategory = async (req, res = response) => {
  const { terms } = req.params;
  findProductByCat(terms, res);
};

module.exports = {
  find,
  findProductsCategory,
};

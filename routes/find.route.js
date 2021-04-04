const { Router } = require('express');
const { check } = require('express-validator');
const { find, findProductsCategory } = require('../controllers');
const { validateFields } = require('../middlewares');

const router = Router();

router.get(
  '/:collection/:terms',
  [
    check('collection', 'collection is required').not().isEmpty(),
    check('terms', 'terms is required').not().isEmpty(),
    validateFields,
  ],
  find
);

router.get(
  '/products/category/:terms',
  [check('terms', 'terms is required').not().isEmpty(), validateFields],
  findProductsCategory
);

module.exports = router;

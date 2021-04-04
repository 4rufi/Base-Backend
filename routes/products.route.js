const { Router } = require('express');
const { check } = require('express-validator');
const {
  validateFields,
  validateJWT,
  validateRoles,
} = require('../middlewares');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers');
const { existProductId, existCategoryId } = require('../helpers/dbValidators');

const router = Router();

router.get('/', getProducts);

router.get(
  '/:id',
  [
    check('id', 'ID not valid').isMongoId().custom(existProductId),
    validateFields,
  ],
  getProduct
);

router.post(
  '/',
  [
    validateJWT,
    validateRoles('ADMIN_ROLE', 'USER_ROLE'),
    check('name', 'name is required').not().isEmpty(),
    check('category', 'category not valid').isMongoId().custom(existCategoryId),
    validateFields,
  ],
  createProduct
);

router.put(
  '/:id',
  [
    validateJWT,
    validateRoles('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'ID not valid').isMongoId().custom(existProductId),
    validateFields,
  ],
  updateProduct
);

router.delete(
  '/:id',
  [
    validateJWT,
    validateRoles('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'ID not valid').isMongoId().custom(existProductId),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;

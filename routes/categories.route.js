const { Router } = require('express');
const { check } = require('express-validator');
const {
  validateFields,
  validateJWT,
  validateRoles,
} = require('../middlewares');
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers');
const { existCategoryId } = require('../helpers/dbValidators');

const router = Router();

router.get('/', getCategories);

router.get(
  '/:id',
  [
    check('id', 'ID not valid').isMongoId().custom(existCategoryId),
    validateFields,
  ],
  getCategory
);

router.post(
  '/',
  [
    validateJWT,
    validateRoles('ADMIN_ROLE', 'USER_ROLE'),
    check('name', 'name is required').not().isEmpty(),
    validateFields,
  ],
  createCategory
);

router.put(
  '/:id',
  [
    validateJWT,
    validateRoles('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'ID not valid').isMongoId().custom(existCategoryId),
    check('name', 'name is required').not().isEmpty(),
    validateFields,
  ],
  updateCategory
);

router.delete(
  '/:id',
  [
    validateJWT,
    validateRoles('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'ID not valid').isMongoId().custom(existCategoryId),
    validateFields,
  ],
  deleteCategory
);

module.exports = router;

const { Router } = require('express');
const { check } = require('express-validator');
const { deleteUser, getUser, postUser, putUser } = require('../controllers');
const { isValidRole, existEmail, existUserId } = require('../helpers');
const {
  validateFields,
  validateJWT,
  validateRoles,
} = require('../middlewares');

const router = Router();

router.get('/', getUser);

router.post(
  '/',
  [
    check('email', 'email not valid').isEmail().custom(existEmail),
    check('name', 'name is required').not().isEmpty(),
    check(
      'password',
      'password is required and greater than 6 characters'
    ).isLength({ min: 6 }),
    check('role').custom(isValidRole),
    validateFields,
  ],
  postUser
);

router.put(
  '/:id',
  [
    check('id', 'ID not valid').isMongoId().custom(existUserId),
    check('role').custom(isValidRole),
    validateFields,
  ],
  putUser
);

router.delete(
  '/:id',
  [
    validateJWT,
    validateRoles('ADMIN_ROLE'),
    check('id', 'ID not valid').isMongoId().custom(existUserId),
    validateFields,
  ],
  deleteUser
);

module.exports = router;

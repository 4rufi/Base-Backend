const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'email not valid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields,
  ],

  login
);

module.exports = router;

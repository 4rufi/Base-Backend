const validateFields = require('./validateFields');
const validateJWT = require('./validateJwt');
const validateRoles = require('./validateRole');

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validateRoles,
};

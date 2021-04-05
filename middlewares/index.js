const validateFields = require('./validateFields');
const validateJWT = require('./validateJwt');
const validateRoles = require('./validateRole');
const validateFile = require('./validateFile');

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validateRoles,
  ...validateFile,
};

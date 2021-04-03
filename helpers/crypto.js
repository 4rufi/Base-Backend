const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const hash = (text) => {
  const salt = bcryptjs.genSaltSync();
  return bcryptjs.hashSync(text, salt);
};

const validatePass = (password, passwordDb) => {
  return bcryptjs.compareSync(password, passwordDb);
};

const generateJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: '4h',
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject('Error to generate Token');
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  hash,
  generateJWT,
  validatePass,
};

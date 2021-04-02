const bcryptjs = require('bcryptjs');

const hash = (text) => {
  const salt = bcryptjs.genSaltSync();
  return bcryptjs.hashSync(text, salt);
};

module.exports = {
  hash,
};

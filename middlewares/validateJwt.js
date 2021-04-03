const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req, res = response, next) => {
  const token = req.header('x-token');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(uid);
    if (!user) res.status(401).json({ message: 'Unauthorized' });
    if (!user.state) res.status(401).json({ message: 'Unauthorized' });
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Token not valid' });
  }
};

module.exports = {
  validateJWT,
};

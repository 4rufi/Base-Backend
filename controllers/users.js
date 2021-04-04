const { response } = require('express');
const { User } = require('../models');
const { hash } = require('../helpers/crypto');

const getUser = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const state = { state: true };
  const [total, users] = await Promise.all([
    User.countDocuments(state),
    User.find(state).limit(Number(limit)).skip(Number(from)),
  ]);
  res.json({ total, users });
};

const postUser = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });
  user.password = hash(user.password);
  await user.save();
  res.json(user);
};

const putUser = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, ...userData } = req.body;
  if (password) {
    userData.password = hash(password);
  }
  const user = await User.findByIdAndUpdate(id, userData, {
    new: true,
  });
  res.json(user);
};

const deleteUser = async (req, res = response) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );
  res.json(user);
};

module.exports = {
  deleteUser,
  getUser,
  postUser,
  putUser,
};

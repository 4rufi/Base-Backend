const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { User, Category, Product } = require('../models');

const findUsers = async (term = '', res = response) => {
  const isMongoId = ObjectId.isValid(term);
  if (isMongoId) {
    const user = await User.findById(term);
    return res.json({ results: user ? [user] : [] });
  }
  const regex = new RegExp(term, 'i');
  const [total, users] = await Promise.all([
    User.countDocuments({
      $or: [{ name: regex }, { email: regex }],
      $and: [{ state: true }],
    }),
    User.find({
      $or: [{ name: regex }, { email: regex }],
      $and: [{ state: true }],
    }),
  ]);
  return res.json({ total, results: users ? users : [] });
};

const findCategories = async (category = '', res = response) => {
  const isMongoId = ObjectId.isValid(category);
  if (isMongoId) {
    const categoryDB = await Category.findById(category).populate(
      'user',
      'name'
    );
    return res.json({ results: categoryDB ? [categoryDB] : [] });
  }
  const regex = new RegExp(category, 'i');
  const [total, categories] = await Promise.all([
    Category.countDocuments({ name: regex, state: true }),
    Category.find({ name: regex, state: true }).populate('user', 'name'),
  ]);
  return res.json({ total, results: categories ? categories : [] });
};

const findProducts = async (product = '', res = response) => {
  const isMongoId = ObjectId.isValid(product);
  if (isMongoId) {
    const productDB = await Product.findById(product)
      .populate('user', 'name')
      .populate('category', 'name');
    return res.json({ results: productDB ? [productDB] : [] });
  }
  const regex = new RegExp(product, 'i');
  const [total, products] = await Promise.all([
    Product.countDocuments({ name: regex, state: true }),
    Product.find({ name: regex, state: true })
      .populate('user', 'name')
      .populate('category', 'name'),
  ]);
  return res.json({ total, results: products ? products : [] });
};

const findProductByCat = async (category = '', res = response) => {
  const isMongoId = ObjectId.isValid(category);
  if (!isMongoId)
    return res.status(400).json({ message: 'category not valid' });

  const [total, products] = await Promise.all([
    Product.countDocuments({ category: ObjectId(category) }),
    Product.find({ category: ObjectId(category) })
      .populate('user', 'name')
      .populate('category', 'name'),
  ]);

  return res.json({ total, results: products ? products : [] });
};

module.exports = {
  findUsers,
  findCategories,
  findProducts,
  findProductByCat,
};

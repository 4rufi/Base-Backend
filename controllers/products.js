const express = require('express');
const { Product, Category } = require('../models');

const getProducts = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const state = { state: true };
  const [total, product] = await Promise.all([
    Product.countDocuments(state),
    Product.find(state)
      .limit(Number(limit))
      .skip(Number(from))
      .populate('user', 'name')
      .populate('category', 'name'),
  ]);
  res.json({ total, product });
};

const getProduct = async (req, res = response) => {
  const { id } = req.params;
  console.log(id);
  const product = await Product.findById(id)
    .populate('user', 'name')
    .populate('category', 'name');

  res.json({ product });
};

const createProduct = async (req, res = response) => {
  const name = req.body.name.toUpperCase();
  const { state, price, description, available, category } = req.body;

  const productDB = await Product.findOne({ name });
  if (productDB) res.status(400).json({ message: `Product ${name} exists` });

  const categoryDB = await Category.findById(category);
  if (!categoryDB)
    res.status(400).json({ message: `Category ${category} not exists` });

  const data = {
    name,
    description,
    price,
    category,
    state,
    available,
    user: req.user._id,
  };

  const product = new Product(data);
  await product.save();

  res.status(201).json(product);
};

const updateProduct = async (req, res = response) => {
  const { id } = req.params;
  const { _id, state, ...productData } = req.body;
  const name = productData.name.toUpperCase();
  productData.name = name;
  productData.user = req.user._id;

  const productDB = await Product.findById(id);
  if (productDB) {
    if (productDB.name === name) delete productData.name;
  }
  if (!productData.category) {
    productData.category = productDB.category;
  }

  const categoryDB = await Category.findById(productData.category);
  if (!categoryDB)
    res.status(400).json({ message: `Category ${category} not exists` });

  const product = await Product.findByIdAndUpdate(id, productData, {
    new: true,
  });
  res.json(product);
};

const deleteProduct = async (req, res = response) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );
  res.json(product);
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

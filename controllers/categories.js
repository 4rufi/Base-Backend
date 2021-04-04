const express = require('express');
const { Category } = require('../models');

const getCategories = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const state = { state: true };
  const [total, categories] = await Promise.all([
    Category.countDocuments(state),
    Category.find(state)
      .limit(Number(limit))
      .skip(Number(from))
      .populate('user', 'name'),
  ]);
  res.json({ total, categories });
};

const getCategory = async (req, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate('user', 'name');

  res.json({ category });
};

const createCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase();
  const categoryDB = await Category.findOne({ name });
  if (categoryDB)
    res.status(400).json({ message: `Category ${categoryDB.name} exists` });

  const data = {
    name,
    user: req.user._id,
  };

  const category = new Category(data);
  await category.save();

  res.status(201).json(category);
};

const updateCategory = async (req, res = response) => {
  const { id } = req.params;
  const { _id, state, ...categoryData } = req.body;
  const name = categoryData.name.toUpperCase();
  categoryData.name = name;
  categoryData.user = req.user._id;
  const categoryDB = await Category.findOne({ name });
  if (categoryDB) {
    res.status(400).json({ message: 'category name exists' });
  }
  const category = await Category.findByIdAndUpdate(id, categoryData, {
    new: true,
  });
  res.json(category);
};

const deleteCategory = async (req, res = response) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );
  res.json(category);
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};

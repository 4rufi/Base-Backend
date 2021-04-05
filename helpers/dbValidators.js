const { Role, User, Category, Product } = require('../models');

const isValidRole = async (role = '') => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`Role ${role} not registered`);
  }
};

const existEmail = async (email = '') => {
  const existEmail = await User.findOne({ email });
  if (existEmail) throw new Error('Email registered');
};

const existUserId = async (id) => {
  const existUser = await User.findById(id);
  if (!existUser) throw new Error(`ID ${id} not exist`);
};

const existCategoryId = async (id) => {
  const existCategory = await Category.findById(id);
  if (!existCategory) throw new Error(`ID ${id} not exist`);
};

const existProductId = async (id) => {
  const existProduct = await Product.findById(id);
  if (!existProduct) throw new Error(`ID ${id} not exist`);
};

const allowedCollections = async (collection = '', allowed = []) => {
  const include = allowed.includes(collection);
  if (!include)
    throw new Error(
      `Collection ${collection} not allowed, collection allowed: ${allowed}`
    );
  return true;
};
module.exports = {
  isValidRole,
  existEmail,
  existUserId,
  existCategoryId,
  existProductId,
  allowedCollections,
};

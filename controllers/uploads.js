const path = require('path');
const fs = require('fs');
const { response } = require('express');
const { uploadFile } = require('../helpers');
const { User, Product } = require('../models');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const uploadImage = async (req, res = response) => {
  try {
    const name = await uploadFile(req.files, undefined, 'imgs');
    res.json({ name });
  } catch (msg) {
    res.status(400).json({ message: msg });
  }
};

const updateImage = async (req, res = response) => {
  const { id, collection } = req.params;
  let model;
  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) return res.status(400).json({ message: 'User not exists' });
      break;
    case 'products':
      model = await Product.findById(id);
      if (!model) return res.status(400).json({ message: 'User not exists' });
      break;
    default:
      return res.status(500).json({ message: 'collection not allowed' });
  }
  // remove prev image
  if (model.img) {
    const pathImage = path.join(__dirname, '../uploads', collection, model.img);
    if (fs.existsSync(pathImage)) {
      fs.unlinkSync(pathImage);
    }
  }

  model.img = await uploadFile(req.files, undefined, collection);
  await model.save();
  res.json(model);
};

const updateImageCloudinary = async (req, res = response) => {
  const { id, collection } = req.params;
  let model;
  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) return res.status(400).json({ message: 'User not exists' });
      break;
    case 'products':
      model = await Product.findById(id);
      if (!model) return res.status(400).json({ message: 'User not exists' });
      break;
    default:
      return res.status(500).json({ message: 'collection not allowed' });
  }
  // remove prev image
  if (model.img) {
    const nameArr = model.img.split('/');
    const name = nameArr[nameArr.length - 1];
    const [public_id] = name.split('.');
    await cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.file;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  model.img = secure_url;
  await model.save();
  res.json(model);
};

const showImage = async (req, res = response) => {
  const { id, collection } = req.params;
  let model;
  switch (collection) {
    case 'users':
      model = await User.findById(id);
      break;
    case 'products':
      model = await Product.findById(id);
      break;
    default:
      return res.status(500).json({ message: 'collection not allowed' });
  }
  // remove prev image
  if (model.img) {
    const pathImage = path.join(__dirname, '../uploads', collection, model.img);
    if (fs.existsSync(pathImage)) {
      return res.sendFile(pathImage);
    }
  }

  const pathImage = path.join(__dirname, '../assets/no-image.jpg');
  res.sendFile(pathImage);
};

module.exports = {
  uploadImage,
  updateImage,
  updateImageCloudinary,
  showImage,
};

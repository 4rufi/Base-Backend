const { Schema, model } = require('mongoose');
const user = require('./user');

const ProductSchema = Schema({
  name: {
    type: String,
    require: [true, 'name is required'],
    unique: true,
  },
  state: {
    type: Boolean,
    default: true,
    require: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    require: true,
  },
  description: {
    type: String,
    default: 'Sin descripción',
  },
  available: {
    type: Boolean,
    default: true,
  },
  img: { type: String },
});

ProductSchema.methods.toJSON = function () {
  const { __v, state, ...categories } = this.toObject();
  return categories;
};

module.exports = model('Product', ProductSchema);

const { Schema, model } = require('mongoose');
const user = require('./user');

const CategorySchema = Schema({
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
});

CategorySchema.methods.toJSON = function () {
  const { __v, _id, state, ...categories } = this.toObject();
  categories.uid = _id;
  if (categories.user._id) {
    categories.user.uid = categories.user._id;
    delete categories.user._id;
  }
  return categories;
};

module.exports = model('Category', CategorySchema);

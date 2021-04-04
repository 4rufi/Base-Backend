const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
  role: {
    type: String,
    require: [true, 'role is required'],
  },
});

module.exports = model('Role', RoleSchema);

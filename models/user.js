const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: String,
  hashedPassword: {
    type: String,
    // required: true
  },
  token: String
});

module.exports = model('User', userSchema);
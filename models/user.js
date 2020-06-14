const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: String,
  hashedPassword: {
    type: String,
    // required: true
  },
  token: String,
  courses: [{
    type: Schema.Types.ObjectId, // reference every ID of your courses
    ref: 'Course'
  }]
});

module.exports = model('User', userSchema);
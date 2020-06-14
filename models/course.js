const { Schema, model } = require('mongoose');

const courseSchema = new Schema({
  title: String,
  views: Number,
  user: {
    type: Schema.Types.ObjectId, // To reference model of other Model de Mongoose
    ref: 'User' // namw was created of model of refence
  }
});

module.exports =  model('Course', courseSchema);
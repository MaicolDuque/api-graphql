const { Schema, model } = require('mongoose');

const courseSchema = new Schema({
  title: String,
  views: Number
});

module.exports =  model('Course', courseSchema);
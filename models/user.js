const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../libs/env').secret;

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

userSchema.virtual('password'); // Se crear virtual, para que no se almacena esta info en base de datos, solo cifrada

userSchema.pre('save', async function(){ // Hook que se ejecutará antes de guardar un nuevo usuario en la BD.
  if(this.password === undefined) return;
  try {
    const hash = await bcrypt.hash(this.password, 10);    
    this.hashedPassword = hash;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

//statics: nos permite crear métodos estaticos que pueden ser accedidos así: User.authenticate
userSchema.statics.authenticate = async function ({ email, password }){
  const user = await this.findOne({ email });
  if(!user) throw new Error('Email or password are wrong');

  const result = await bcrypt.compare(password, user.hashedPassword);
  if(!result) throw new Error('Email or password are wrong');

  //JWT
  user.token = jwt.sign({ id: user.id }, secret );
  await user.save();
  return user;
}

module.exports = model('User', userSchema);
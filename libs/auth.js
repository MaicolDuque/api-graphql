
const jwt = require('jsonwebtoken');
const secret = require('./env').secret;
const User = require('../models/user');

module.exports = async function ({ req }){
  let token = null;
  let currenUser = null;

  token = req.headers["authorization"];
  if(token){    
    const decodeInfo = jwt.verify(token, secret);
    if(decodeInfo) {
      currenUser = await User.findById(decodeInfo.id);
      if(!currenUser) throw new Error('Invalid token');
    }    
  }

  return {
    token, currenUser
  }
}
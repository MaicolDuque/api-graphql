const User = require('../models/user');
const Course = require('../models/course')

module.exports = {
  Query: {
    async getUsers(){
      return await User.find()
    },
    async getUser(obj, { id }){
      return await User.findById(id);
    }
  },

  Mutation: {
    async signUp(obj, { input }){
      const user = new User(input);
      await user.save();
      return user;
    }
  },
  User: { //User: hace referencia al type User
    async courses(padre){
      return await Course.find({ user: padre.id }) // Ya no es necesario usar populare, asi se pueden agregar los campos personalizados que se necesiten
    }
  }
}
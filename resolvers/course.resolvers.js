
const Course = require('../models/course');
const User = require('../models/user');

const resolvers = {
  Query: {
    async getCourses(obj, { page, limit }, context ) {
      console.log(context);
      let allCourses =  Course.find(); // .populate => Me retorna todo el objeto usuario que hace march con el ID
      if (page !== undefined) {
        allCourses = allCourses.limit(limit).skip((page - 1) * limit, page * limit);
      }
      // if (page !== undefined) {
      //   return allCourses.slice((page - 1) * limit, page * limit)
      // }
      return await allCourses;
    },
    async getCourse(obj, { id }) {
      return await Course.findById(id);
    }
  },

  Mutation: {
    async addCourse(obj, { input, user }) {
      const userObj = await User.findById(user);
      const course = new Course({ ...input, user });
      await course.save();
      userObj.courses.push(course);
      await userObj.save();
      return course;
    },

    async updateCourse(obj, { id, input }) {
      const course = await Course.findByIdAndUpdate(id, input);
      return course;
    },
    async deleteCourse(obj, { id }) {
      await Course.deleteOne({ _id: id });
      return {
        message: `El curso con el id: ${id} fue eliminado correctamente.`
      }
    }
  },
  Course: {
    async user(padre){
      return await User.findById(padre.user);
    }
  }
}

module.exports = resolvers
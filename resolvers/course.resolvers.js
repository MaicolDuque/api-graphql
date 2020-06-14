
const Course = require('../models/course');
const User = require('../models/user');

const resolvers = {
  Query: {
    async getCourses(obj, { page, limit }) {
      let allCourses =  Course.find().populate('user'); // .populate => Me retorna todo el objeto usuario que hace march con el ID
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
      await userObj.courses.push(course);
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
  }
}

module.exports = resolvers
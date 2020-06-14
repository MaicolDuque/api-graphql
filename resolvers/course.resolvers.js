
const Course = require('../models/course')
const resolvers = {
  Query: {
    async getCourses(obj, { page, limit }) {
      let allCourses =  Course.find();
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
    async addCourse(obj, { input }) {
      const existCourse = await Course.find({ title: input.title })
      if (!existCourse.length) {
        const newCourse = new Course(input);
        return await newCourse.save()
      }
      return { id: 0, title: "Ya existe el curso con nombre: " + input.title }
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

const Course = require('../models/course')
const resolvers = {
  Query: {
    getCourses(obj, { page, limit }){
      if(page !== undefined){
        return courses.slice((page - 1) * limit, page * limit )
      }
      return courses;
    },
    getCourse(obj, { id }){
      return courses.find(course => course.id == id)
    }
  },
  
  Mutation: {
    async addCourse(obj, { input }){
      const course = new Course(input);
      await course.save()
      return course;
    },
    updateCourse(obj, { id, input }){
      const indexCourse   = courses.findIndex(curso => id == curso.id);
      const currentCourse = courses[indexCourse];
      
      const newCourse     = Object.assign(currentCourse, input );
      courses[indexCourse] = newCourse;
  
      return newCourse;
    },
    deleteCourse(obj, { id }){
      courses = courses.filter(course => course.id != id)
      return {
        message: `El curso con el id: ${id} fue eliminado correctamente.`
      }
    }
  }
}

module.exports = resolvers
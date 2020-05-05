
const Course = require('../models/course')
const resolvers = {
  Query: {
    async getCourses(obj, { page, limit }){
      const allCourses = await Course.find();      
      if(page !== undefined){
        return allCourses.slice((page - 1) * limit, page * limit )
      }
      return allCourses;
    },
    async getCourse(obj, { id }){
      return await Course.findById(id);      
    }
  },
  
  Mutation: {
    async addCourse(obj, { input }){
      const existCourse = await Course.find({ title: input.title })         
      if(!existCourse.length){
        const newCourse   = new Course(input);
        return await newCourse.save()
      }
      return { id: 0, title: "Ya existe el curso con nombre: " + input.title }
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
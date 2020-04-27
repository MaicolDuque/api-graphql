module.exports =  `

  input CourseInput {
    title: String!,
    views: Int
  }

  type Course {
    id: ID!,
    title: String!,
    views: Int
  }

  extend type Query {
    getCourses(page: Int, limit: Int = 1): [Course],
    getCourse(id: ID!): Course
  }

  extend type Mutation {
    addCourse(input: CourseInput): Course
    updateCourse(id: ID!, input: CourseInput): Course
    deleteCourse(id: ID!): Alert
  }

`


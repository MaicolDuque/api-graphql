module.exports.userTypes = `
  type User {
    id: ID!
    email: String!
    hashedPassword: String
    token: String
  }

  extend type Query {
    getUsers: [User]
    getUser(id: ID!)
  }

  input UserInput {
    email: String,
    password: String
  }

  extend type Mutation {
    signUp(input: UserInput): User
    logIn(input: UserInput): User
    signOut: Alert
  }

`
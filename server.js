const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { merge } = require('lodash');

const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const { makeExecutableSchema } = require('graphql-tools')

const courseTypesDefs = require('./types/course.types');
const courseResolver  = require('./resolvers/course.resolvers');

const userTypesDefs = require('./types/user.types');
const userResolver  = require('./resolvers/user.resolvers');

mongoose.connect('mongodb://localhost/graphql_db', { useNewUrlParser: true, useUnifiedTopology: true })

const app = express();

const typeDefs = `
  type Alert {
    message: String
  }

  type Query {
    _ : Boolean
  }

  type Mutation {
    _ : Boolean
  }

`
const resolver = {}


const schema = makeExecutableSchema({
  typeDefs: [typeDefs, courseTypesDefs, userTypesDefs], 
  resolvers: merge(resolver, courseResolver, userResolver)
})



app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))


app.listen(8080, ()=> {
  console.log("Servidor iniciado: http://localhost:8080");
})


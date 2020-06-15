const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { merge } = require('lodash');

const { ApolloServer } = require('apollo-server-express');

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

const server = new ApolloServer({
  typeDefs: [typeDefs, courseTypesDefs, userTypesDefs], 
  resolvers: merge(resolver, courseResolver, userResolver)
});

server.applyMiddleware({app: app});

app.listen(8080, ()=> {
  console.log("Servidor iniciado: http://localhost:8080");
})


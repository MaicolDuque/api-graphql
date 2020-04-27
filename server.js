const express = require('express');
const mongoose = require('mongoose');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const bodyParser = require('body-parser');


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
const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {}
})



app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))


app.listen(8080, ()=> {
  console.log("Servidor iniciado...");
})


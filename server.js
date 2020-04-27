const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/graphql_db', { useNewUrlParser: true, useUnifiedTopology: true })
const app = express();

app.listen(8080, ()=> {
  console.log("Servidor iniciado...");
})


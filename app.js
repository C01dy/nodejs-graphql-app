const express = require('express');
const logger = require('./logger');
const { connectToMongoDB } = require('./db');
const schema = require('./graphql/schema');
const { graphqlHTTP } = require('express-graphql');
require('dotenv').config();

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

connectToMongoDB(function () {
  app.listen(process.env.PORT, () => {
    logger.log('info', `Server is running on ${process.env.PORT}`);
  });
});

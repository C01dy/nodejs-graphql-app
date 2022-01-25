const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const logger = require('./logger');
const { connectToMongoDB } = require('./db');
const schema = require('./graphql/schema');
require('dotenv').config();

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

connectToMongoDB(() => {
  app.listen(process.env.PORT, () => {
    logger.log('info', `Server is running on ${process.env.PORT}`);
  });
});

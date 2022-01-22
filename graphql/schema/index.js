const { GraphQLObjectType, GraphQLSchema } = require("graphql");

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {},
});

module.exports = new GraphQLSchema({
  query: Query,
});

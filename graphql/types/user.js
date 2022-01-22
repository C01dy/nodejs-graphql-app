const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const ArticleType = require("./article");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    nickname: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    avatarUrl: { type: new GraphQLNonNull(GraphQLString) },
    favoriteArticles: {
      type: new GraphQLList(ArticleType),
      resolve: async (parent, args) => {},
    },
    writtenArticles: {
      type: new GraphQLList(ArticleType),
      resolve: async (parent, args) => {},
    },
  }),
});

module.exports = UserType;

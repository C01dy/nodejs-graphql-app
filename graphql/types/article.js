const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require("graphql");
const UserType = require("./user");

const ArticleType = new GraphQLObjectType({
  name: "Article",
  fields: () => ({
    id: { type: GraphQLID },
    author: {
      type: UserType,
      resolve: async (parent, args) => {},
    },
    title: { type: new GraphQLNonNull(GraphQLString) },
    textContent: { type: new GraphQLNonNull(GraphQLString) },
    likes: { type: GraphQLInt },
    readTime: { type: GraphQLInt },
    publishingDate: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    images: { type: new GraphQLList(GraphQLString) },
    comments: {},
    likedUsers: {
      type: UserType,
      resolve: async (parent, args) => {},
    },
  }),
});

module.exports = ArticleType;

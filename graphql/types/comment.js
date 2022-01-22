const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require("graphql");
const UserType = require("./user");

const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    id: { type: GraphQLID },
    userId: {
      type: UserType,
      resolve: async (parent, args) => {},
    },
    text: { type: new GraphQLNonNull(GraphQLString) },
    likedUsers: {
      type: UserType,
      resolve: async (parent, args) => {},
    },
  }),
});

module.exports = CommentType;

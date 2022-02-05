const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const User = require('../../db/models/user');
const Article = require('../../db/models/article');
const Comment = require('../../db/models/comment');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    nickname: { type: new GraphQLNonNull(GraphQLString) },
    avatarUrl: { type: new GraphQLNonNull(GraphQLString) },
    writtenArticles: {
      type: new GraphQLList(ArticleType),
      resolve: async (parent) => {
        const writtenArticles = await Article.find({ authorId: parent._id });
        return writtenArticles;
      },
    },
  }),
});

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: GraphQLID },
    user: {
      type: UserType,
      resolve: async (parent) => {
        const user = await User.findById(parent.userId);
        return user;
      },
    },
    text: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: new GraphQLNonNull(GraphQLString) },
    textContent: { type: new GraphQLNonNull(GraphQLString) },
    likes: { type: GraphQLInt },
    readTime: { type: GraphQLInt },
    publishingDate: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    images: { type: new GraphQLList(GraphQLString) },
    author: {
      type: UserType,
      resolve: async (parent, args) => {
        const author = await User.findById(parent.authorId);
        return author;
      },
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve: async (parent) => {
        const comments = await Comment.find({ articleId: parent._id });
        return comments;
      },
    },
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    article: {
      type: ArticleType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        const article = await Article.findById(args.id);
        return article;
      },
    },
    articles: {
      type: new GraphQLList(ArticleType),
      resolve: async () => {
        const articlesArray = await Article.find({});
        return articlesArray;
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        const user = await User.findById(args.id);
        return user;
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: async () => {
        const usersArray = await User.find({});
        return usersArray;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} = require('graphql');


// const Article = require('../../db/models/article');
const User = require('../../db/models/user');
const Article = require('../../db/models/article');

const articles = [
  {
    id: '1',
    authorId: '1',
    title: 'JavaScript',
    textContent: 'JS JS JS JS',
    likes: 5,
    readTime: 7,
    publishingDate: '23.01.2022',
    tags: ['#javascript', '#programming', '#webdevelopment'],
    images: ['a.jpg', 'b.jpeg', 'c.png'],
  },
  {
    id: '2',
    authorId: '1',
    title: 'GQL',
    textContent: 'GQL GQL GQL GQL',
    likes: 10,
    readTime: 9,
    publishingDate: '22.01.2022',
    tags: ['#graphql', '#programming', '#webdevelopment'],
    images: ['a.jpg', 'b.jpeg', 'c.png'],
  },
];

const users = [
  {
    id: '1',
    name: 'John',
    nickname: 'Johhn1',
    email: 'john.m12@gmail.com',
    password: 'qwerty123456789',
    avatarUrl: 'john_avatar.png',
    // writtenArticles: ['1'],
  },
];

const comments = [
  {
    id: '1',
    userId: '1',
    text: 'Thanks for explanation',
  },
  {
    id: '2',
    userId: '1',
    text: 'Ok, good',
  },
];

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    nickname: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    avatarUrl: { type: new GraphQLNonNull(GraphQLString) },
    favoriteArticles: {
      type: new GraphQLList(ArticleType),
      resolve: async (parent) => {
        const res = await Article.find({ likedUsersIds: parent.id });
        const articles = res.json();
        return articles;
      },
    },
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
    userId: {
      type: UserType,
      resolve: async (parent) => {
        const res = await User.findById(parent.userId);
        const author = res.json();
        return author;
      },
    },
    text: { type: new GraphQLNonNull(GraphQLString) },
    likedUsers: {
      type: new GraphQLList(UserType),
      resolve: async (parent) => {
        const res = await User.find({ favoriteArticlesIds: parent.id });
        const usersData = res.json();
        return usersData;
      },
    },
  }),
});

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    id: { type: GraphQLID },
    // author: {
    //   type: UserType,
    //   resolve: async (parent) => {
    //     const res = await User.findById(parent.authorId);
    //     const author = res.json();
    //     return author;
    //   },
    // },
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
    // comments: {
    //   type: new GraphQLList(CommentType),
    //   resolve: async (parent) => {
    //     const res = await Comment.find({ userId: parent.id });
    //     const comments = res.json();
    //     return comments;
    //   },
    // },
    // likedUsers: {
    //   type: UserType,
    //   resolve: async (parent) => {
    //     const res = await User.find({ favoriteArticlesIds: parent.id });
    //     const users = res.json();
    //     return users;
    //   },
    // },
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

const { Schema, Types, model } = require('mongoose');

const { ObjectId } = Types;

const articleSchema = new Schema({
  id: ObjectId,
  authorId: {
    type: ObjectId,
    ref: 'User',
  },
  title: String,
  textContent: String,
  likes: Number,
  readTime: Number,
  publishingDate: Date,
  tags: [String],
  images: [String],
  commentsIds: [{ type: ObjectId, ref: 'Comment' }],
  likedUsersIds: [{ type: ObjectId, ref: 'User' }],
});

module.exports = model('Article', articleSchema, 'article');

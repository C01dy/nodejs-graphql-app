const { Schema, Types, model } = require('mongoose');
const { ObjectId } = Types;

const articleSchema = new Schema({
  id: ObjectId,
  author: {
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
  comments: [{ type: ObjectId, ref: 'Comment' }],
  likedUsers: [{ type: ObjectId, ref: 'User' }],
});

module.exports = model('Article', articleSchema);

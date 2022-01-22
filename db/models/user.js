const { Schema, Types, model } = require('mongoose');
const { ObjectId } = Types;

const userSchema = new Schema({
  id: ObjectId,
  name: String,
  nickname: String,
  likes: Number,
  email: String,
  password: String,
  avatarUrl: String,
  favoriteArticles: [{ type: ObjectId, ref: 'Article' }],
  writtenArticles: [{ type: ObjectId, ref: 'Article' }],
});

module.exports = model('User', userSchema);

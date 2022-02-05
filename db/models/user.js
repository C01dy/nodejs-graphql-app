const { Schema, Types, model } = require('mongoose');

const { ObjectId } = Types;

const userSchema = new Schema({
  id: ObjectId,
  name: String,
  nickname: String,
  email: String,
  password: String,
  avatarUrl: String,
  writtenArticlesIds: [{ type: ObjectId, ref: 'Article' }],
});

module.exports = model('User', userSchema);

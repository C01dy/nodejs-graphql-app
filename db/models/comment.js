const { Schema, Types, model } = require('mongoose');

const { ObjectId } = Types;

const commentSchema = new Schema({
  id: ObjectId,
  userId: { type: ObjectId, ref: 'User' },
  articleId: { type: ObjectId, ref: 'Article' },
  text: String,
});

module.exports = model('Comment', commentSchema);

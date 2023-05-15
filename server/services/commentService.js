const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const Game = require("../models/Game");
const User = require("../models/User");

async function getAll(gameId) {
  // Returns true if Mongoose can cast the given value to an ObjectId, or false otherwise.
  const isValid = mongoose.isValidObjectId(gameId);

  if (isValid) {
    return Comment.find({ gameId: gameId });
  }

  // Getting curr user all comments
  // userId =  "6395b0a7eaeb094e89d57132"
  // return Comment.find({ _ownerId: userId });
}

async function createComment(gameId, userId, { subject, content }) {
  const { email, username } = await User.findById(userId);

  const comment = await Comment.create({
    author: { email, username },
    subject,
    content,
    gameId,
    _ownerId: userId,
  });

  const game = await Game.findByIdAndUpdate(
    { _id: gameId },
    { $push: { comments: comment._id } }
  );

  return comment;
}

module.exports = {
  getAll,
  createComment,
};

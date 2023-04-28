const { Schema, model, Types } = require("mongoose");

const commentSchema = new Schema(
  {
    subject: {
      type: String,
      required: true,
      minlength: [3, "Subject should be at least 3 characters long!"],
    },
    content: {
      type: String,
      required: true,
      minlength: [3, "Content should be at least 3 characters long!"],
    },
    author: {
      email: { type: String },
      username: { type: String },
    },
    gameId: { type: Types.ObjectId, ref: "Game" },
    _ownerId: { type: Types.ObjectId, ref: "User" },
    games: { type: [Types.ObjectId], ref: "Game", default: [] },
  },
  { timestamps: { createdAt: "created_at" } }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;

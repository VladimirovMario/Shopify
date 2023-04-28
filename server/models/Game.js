const { Schema, model, Types } = require("mongoose");

const URL_PATTERN = /^https?:\/\/.+$/i;

const gameSchema = new Schema(
  {
    title: { type: String, required: true , minlength: [3, 'Title must be at least 3 characters long']},
    description: { type: String, required: true , minlength: [4, 'Description should be a minimum of 4 characters long!'],
    maxlength: [1400, 'Description should be a maximum of 1400 characters long!']},
    imageUrl: { type: String, required: true,
        validate: {
        validator: (value) => URL_PATTERN.test(value),
        message: "The imageUrl should starts with http or https",
      },
    },
    genre: { type: String, required: true , minlength: [3, 'Genre should be a minimum of 3 characters long!']},
    price: { type: String, required: true, type: Number, required: true, min: [0.01, 'Price must be a positive number']},   
    users: { type: [Types.ObjectId], ref: "User", default: [] },
    comments: { type: [Types.ObjectId], ref: "Comment", default: [] },
    usersCount: { type: Number, default: 0 },
    _ownerId: { type: Types.ObjectId, ref: "User" },
  },
  { timestamps: { createdAt: "created_at" } }
);

const Game = model("Game", gameSchema);

module.exports = Game;

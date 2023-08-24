const mongoose = require('mongoose');
const Game = require('../models/Game');
const Comment = require('../models/Comment');

async function getAll(searchQuery) {
  let queryTitle = {};
  let queryGenre = {};
  const initialProperties = 'title description imageUrl genre price';

  try {
    if (searchQuery) {
      queryTitle = { title: new RegExp(searchQuery, 'i') };
      queryGenre = { genre: new RegExp(searchQuery, 'i') };
    }
    return await Game.find({ $or: [queryTitle, queryGenre] }).select(
      initialProperties
    );
  } catch (error) {
    throw new Error(error);
  }
}

async function createGame(game) {
  return Game.create(game);
}

async function getById(id) {
  // Returns true if Mongoose can cast the given value to an ObjectId, or false otherwise.
  const isValid = mongoose.isValidObjectId(id);

  if (isValid) {
    return Game.findById(id);
  }
}

async function deleteById(id) {
  const deletedGame = await Game.findByIdAndRemove(id);
  const deletedComments = await Comment.deleteMany({
    _id: { $in: deletedGame.comments },
  });

  return deletedGame;
}

async function updateById(id, body) {
  const edited = await Game.findById(id);
  edited.title = body.title;
  edited.description = body.description;
  edited.imageUrl = body.imageUrl;
  edited.genre = body.genre;
  edited.price = Number(body.price);

  return edited.save();
}

async function getLatestsGames(limit) {
  const initialProperties = 'title description imageUrl genre price';
  return Game.find()
    .sort({ created_at: -1 })
    .limit(limit)
    .select(initialProperties);
}

async function addGameToFavorites(gameId, userId) {
  const game = await Game.findById(gameId);

  if (game.users.includes(userId) == false) {
    game.users.push(userId);
  }
  return game.save();
}

async function removeGameFromFavorites(gameId, userId) {
  return await Game.findByIdAndUpdate(
    { _id: gameId },
    { $pull: { users: userId } }
  );
}

async function getUserFavorites(userId) {
  return Game.find({ users: userId });
}

module.exports = {
  getAll,
  createGame,
  getById,
  deleteById,
  updateById,
  getLatestsGames,
  addGameToFavorites,
  removeGameFromFavorites,
  getUserFavorites,
};

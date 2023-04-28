const Game = require("../models/Game");
const Comment = require("../models/Comment");

async function getAll(search) {
  const query = {};
  if (search) {
    query.title = new RegExp(search, "i");
  }
  return Game.find(query);
}

async function createGame(game) {
  return Game.create(game);
}

async function getById(id) {
  // TODO fix the problem with invalid ID's
  // The server dies
  // http://localhost:3000/catalog/test
  return Game.findById(id);
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
  return Game.find().sort({ created_at: -1 }).limit(limit);
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

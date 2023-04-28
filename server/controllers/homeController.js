const { getAll, getLatestsGames } = require("../services/gameService");

const homeController = require("express").Router();

homeController.get("/", async (req, res) => {
 
  let games = [];
  const limit = Number(req.query.limit) || 0;

  if (limit) {
    games = await getLatestsGames(limit);
  } else {
    games = await getAll();
  }
  res.status(200).json(games);
});

module.exports = homeController;

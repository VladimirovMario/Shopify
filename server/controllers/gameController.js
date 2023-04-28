const gameController = require("express").Router();

const { hasUser } = require("../middlewares/guards");
const {
  getAll,
  createGame,
  getById,
  deleteById,
  updateById,
  addGameToFavorites,
  removeGameFromFavorites,
  getUserFavorites,
} = require("../services/gameService");

const { parseError } = require("../util/parser");

gameController.get("/", async (req, res) => {
  let items = [];
  if (req.query.search !== undefined) {
    items = await getAll(req.query.search);
  } else {
    items = await getAll();
  }
  res.json(items);
});

gameController.post("/", hasUser(), async (req, res) => {
  const game = {
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    genre: req.body.genre,
    price: Number(req.body.price),
    _ownerId: req.user._id,
  };

  try {
    const item = await createGame(game);
    res.json(item);
  } catch (err) {
    const message = parseError(err);
    res.status(400).json({ message });
  }
});

gameController.get("/:id", async (req, res) => {
  const item = await getById(req.params.id);
  res.json(item);
});

gameController.put("/:id", hasUser(), async (req, res, next) => {
  try {
    // implement isOwner
    const item = await getById(req.params.id);
    if (req.user._id != item._ownerId) {
      return res.status(403).json({ message: "You cannot modify this record" });
    }

    const result = await updateById(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    const message = parseError(err);
    res.status(400).json({ message });
  }
});

gameController.delete("/:id", hasUser(), async (req, res) => {
  // TODO to see if i need owner or implement admin role
  try {
    // implement isOwner
    const item = await getById(req.params.id);
    if (req.user._id != item._ownerId) {
      return res.status(403).json({ message: "You cannot modify this record" });
    }

    await deleteById(req.params.id);
    res.status(204).end();
  } catch (err) {
    const message = parseError(err);
    res.status(400).json({ message });
  }
});

gameController.post("/favorites/:gameId", hasUser(), async (req, res) => {
  try {
    const item = await addGameToFavorites(req.params.gameId, req.user._id);
    res.json(item);
  } catch (err) {
    const message = parseError(err);
    res.status(400).json({ message });
  }
});

gameController.put("/favorites/:gameId", hasUser(), async (req, res) => {
  try {
    const item = await removeGameFromFavorites(req.params.gameId, req.user._id);
    res.json(item);
  } catch (err) {
    const message = parseError(err);
    res.status(400).json({ message });
  }
});

gameController.get("/favorites/:userId", async (req, res) => {
  // TODO make an authorized request with "hasUser()" guard and use req.user._id
  // After fixing the "client" authorization
  try {
    // const item = await getUserFavorites(req.user._id);
    const item = await getUserFavorites(req.params.userId);
    res.json(item);
  } catch (err) {
    const message = parseError(err);
    res.status(400).json({ message });
  }
});

module.exports = gameController;

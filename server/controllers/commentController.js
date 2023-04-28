const commentController = require("express").Router();

const { hasUser } = require("../middlewares/guards");
const { getAll, createComment } = require("../services/commentService");
const { parseError } = require("../util/parser");

commentController.get("/:gameId", async (req, res) => {
  const comments = await getAll(req.params.gameId);
  res.status(200).json(comments);
});

commentController.post("/:gameId", hasUser(), async (req, res) => {
  try {
    const comment = await createComment(
      req.params.gameId,
      req.user._id,
      req.body
    );

    res.status(200).json(comment);
  } catch (error) {
    const message = parseError(error);
    res.status(400).json({ message });
  }
});

module.exports = commentController;

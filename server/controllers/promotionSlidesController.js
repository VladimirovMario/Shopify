const {
  getAllPromoSlides,
  createPromoSlides,
} = require('../services/promotionSlidesService');

const promotionSlidesController = require('express').Router();

promotionSlidesController.get('/', async (_, res) => {
  try {
    const slides = await getAllPromoSlides();
    res.json(slides);
  } catch (error) {
    const message = parseError(error);
    res.status(400).json({ message });
  }
});

promotionSlidesController.post('/', async (req, res) => {
  const { imageUrl, title, description, isActive } = req.body;
  const slides = { imageUrl, title, description, isActive };

  try {
    const result = await createPromoSlides(slides);
    res.json(result);
  } catch (error) {
    const message = parseError(error);
    res.status(400).json({ message });
  }
});

module.exports = promotionSlidesController;

const {
  getAllPromoSlides,
  cretePromoSlide,
  editPromoSlide,
  deletePromoSlide,
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
  const { imageUrl, title, slideDescription, isActive } = req.body;
  const slide = { imageUrl, title, slideDescription, isActive };

  try {
    const result = await cretePromoSlide(slide);
    res.json(result);
  } catch (error) {
    const message = parseError(error);
    res.status(400).json({ message });
  }
});

promotionSlidesController.put('/:id', async (req, res) => {
  try {
    const result = await editPromoSlide(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    const message = parseError(error);
    res.status(400).json({ message });
  }
});

promotionSlidesController.delete('/:id', async (req, res) => {
  try {
    const result = await deletePromoSlide(req.params.id);
    res.json(result);
  } catch (error) {
    const message = parseError(error);
    res.status(400).json({ message });
  }
});

module.exports = promotionSlidesController;

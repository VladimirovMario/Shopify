const PromotionSlide = require('../models/PromotionSlide');

async function getAllPromoSlides() {
  return PromotionSlide.find({});
}

async function createPromoSlides(slides) {
  return PromotionSlide.create(slides);
}

module.exports = {
  getAllPromoSlides,
  createPromoSlides,
};

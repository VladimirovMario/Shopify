const PromotionSlide = require('../models/PromotionSlide');

async function getAllPromoSlides() {
  return PromotionSlide.find({})
    .where({ isActive: true })
    .sort({ created_at: -1 });
}

async function cretePromoSlide(slide) {
  return PromotionSlide.create(slide);
}

async function editPromoSlide(id, data) {
  const { title, description, imageUrl, isActive } = data;

  return await PromotionSlide.findByIdAndUpdate(
    id,
    { title, description, imageUrl, isActive },
    { new: true }
  );
}

async function deletePromoSlide(id) {
  return await PromotionSlide.findByIdAndDelete(id);
}

module.exports = {
  getAllPromoSlides,
  cretePromoSlide,
  editPromoSlide,
  deletePromoSlide,
};

const { Schema, model } = require('mongoose');

const URL_PATTERN = /^https?:\/\/.+$/i;

const promotionSlideSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [3, 'Title must be at least 3 characters long'],
    },
    description: {
      type: String,
      required: true,
      minlength: [4, 'Description should be a minimum of 4 characters long!'],
      maxlength: [70, 'Description should be a maximum of 70 characters long!'],
    },
    imageUrl: {
      type: String,
      required: true,
      validate: {
        validator: (value) => URL_PATTERN.test(value),
        message: 'The imageUrl should starts with http:// or https://',
      },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: 'created_at' } }
);

const PromotionSlide = model('PromotionSlide', promotionSlideSchema);

module.exports = PromotionSlide;

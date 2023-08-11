import { requestFactory } from './requester';

const endpoints = {
  allSlides: '/api/promotion-slide/',
};

const request = requestFactory();

export const getAllPromoSlides = async () => {
  return await request.get(endpoints.allSlides);
};

import { requestFactory } from './requester';

const endpoints = {
  allSlides: '/api/promotion-slide',
  createSlide: '/api/promotion-slide',
  editSlide: '/api/promotion-slide/',
  deleteSlide: '/api/promotion-slide/',
};

const request = requestFactory();

export const getAllPromoSlides = async () => {
  return await request.get(endpoints.allSlides);
};

export const cretePromoSlide = async (data) => {
  return await request.post(endpoints.createSlide, data);
};

export const editPromoSlide = async (id, data) => {
  return await request.put(endpoints.editSlide + id, data);
};

export const deletePromoSlide = async (id) => {
  return await request.delete(endpoints.deleteSlide + id);
};

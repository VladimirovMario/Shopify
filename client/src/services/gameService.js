import { requestFactory } from "./requester";

const endpoints = {
  allGames: "/api/game/",
  createGame: "/api/game",
  editGame: "/api/game/",
  deleteGame: "/api/game/",
  details: "/api/game/",
  getFavorites: "/api/game/favorites/",
  addFavorites: "/api/game/favorites/",
  removeFavorites: "/api/game/favorites/",

  latest: (limit) => `/api/?limit=${limit}`,
};

const request = requestFactory();

export const getAllGames = async () => {  
  return await request.get(endpoints.allGames);
};

export const searchGames = async (searchValue) => {  
  const query = `?search=${searchValue}`
  return await request.get(endpoints.allGames + query);
};

export const getById = async (gameId) => {
  return await request.get(endpoints.details + gameId);
};

export const getLatestsGames = async (limit) => {
  return await request.get(endpoints.latest(limit));
};

export const getUserFavorites = async (userId) => {
  return await request.get(endpoints.getFavorites + userId);
};


// Authorized Requests
export const gameServiceFactory = (token) => {
  const authorizedRequest = requestFactory(token);

  const createGame = async (data) => {
    return await authorizedRequest.post(endpoints.createGame, data);
  };

  const editGame = async (id, data) => {
    return await authorizedRequest.put(endpoints.editGame + id, data);
  };

  const deleteGame = async (id) => {
    return await authorizedRequest.delete(endpoints.deleteGame + id);
  };

  const addGameToFavorites = async (gameId) => {
    return await authorizedRequest.post(endpoints.addFavorites + gameId);
  };

  const removeGameFromFavorites = async (gameId) => { 
     return await authorizedRequest.put(endpoints.removeFavorites + gameId);
  };

  return {
    createGame,
    editGame,
    deleteGame,
    addGameToFavorites,
    removeGameFromFavorites,
  };
};

import { createContext, useContext } from 'react';
import { useAuthContext } from './AuthContext';
import { useFavoritesDataFetcher } from '../hooks/useFavoritesDataFetcher';
import { gameServiceFactory } from '../services/gameService';

const GameFavoritesContext = createContext(null);

function GameFavoritesProvider({ children }) {
  const { userId, isAuthenticated, token } = useAuthContext();
  const gameService = gameServiceFactory(token);
  const { favoritesGames, dispatch } = useFavoritesDataFetcher({
    userId,
    isAuthenticated,
  });

  async function onFavoriteRemoveHandler(gameId) {
    try {
      // TODO the result is the whole game,
      // so we can add game title to inform the user what he removed
      await gameService.removeGameFromFavorites(gameId);
    } catch (error) {
      alert(error.message);
    }
  }

  async function addGameToFavorites(gameId) {
    try {
      // TODO the result is the whole game, so we can add game title to success message
      return await gameService.addGameToFavorites(gameId);
    } catch (error) {
      alert(error.message);
    }
  }

  const contextValues = {
    favoritesGames,
    dispatch,
    onFavoriteRemoveHandler,
    addGameToFavorites,
  };

  return (
    <GameFavoritesContext.Provider value={contextValues}>
      {children}
    </GameFavoritesContext.Provider>
  );
}

function useFavoritesContext() {
  return useContext(GameFavoritesContext);
}

export { GameFavoritesContext, GameFavoritesProvider, useFavoritesContext };

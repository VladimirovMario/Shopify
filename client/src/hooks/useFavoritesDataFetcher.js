import { useEffect, useReducer } from 'react';
import { getUserFavorites } from '../services/gameService';
import favoritesGamesReducer from '../reducers/favoritesGamesReducer';

export function useFavoritesDataFetcher({ userId, isAuthenticated }) {
  const [favoritesGames, dispatch] = useReducer(favoritesGamesReducer, []);

  useEffect(() => {
    fetchData();
    async function fetchData() {
      try {
        if (isAuthenticated) {
          const favorites = await getUserFavorites(userId);
          dispatch({
            type: 'INITIAL_FAVORITES',
            favorites,
          });
        } else {
          dispatch({
            type: 'INITIAL_FAVORITES',
            favorites: [],
          });
        }
      } catch (error) {
        alert(error);
      }
    }
  }, [userId, isAuthenticated]);

  return { favoritesGames, dispatch };
}

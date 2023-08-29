import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  gameServiceFactory,
  getAllGames,
  getLatestsGames,
} from '../services/gameService';
import { commentServiceFactory } from '../services/commentService';

import { useAuthContext } from './AuthContext';

export const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [latestGames, setLatestGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token } = useAuthContext();

  const gameService = gameServiceFactory(token);
  const commentService = commentServiceFactory(token);
  const limit = 3;

  useEffect(() => {
    Promise.all([getAllGames(), getLatestsGames(limit)])
      .then(([gamesData, latestGamesData]) => {
        setGames(gamesData);
        setLatestGames(latestGamesData);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  // TODO: Refactor the logic to eliminate unnecessary re-renders.
  // This functionality was implemented for cases where a user deletes a game,
  // causing the 'latestGames' array to become smaller than the defined limit.
  // useEffect(() => {
  //   if (latestGames.length < limit) {
  //     setLatestGames(games.slice(-limit).reverse());
  //   }
  // }, [latestGames.length, games]);

  // TODO extract the handlers
  const onCreateSubmit = async (data) => {
    let { title, genre, price, imageUrl, description } = data;
    price = Number(price);
    try {
      const newGame = await gameService.createGame({
        title,
        genre,
        price,
        imageUrl,
        description,
      });
      setGames((state) => [...state, newGame]);
      setLatestGames([newGame, ...latestGames.slice(0, limit - 1)]);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  const onEditSubmit = async (data) => {
    let { title, genre, price, imageUrl, description } = data;
    price = Number(price);
    const id = data._id;
    try {
      const updatedGame = await gameService.editGame(id, {
        title,
        genre,
        price,
        imageUrl,
        description,
      });
      const updatedState = (state) =>
        state.map((game) => (game._id === id ? updatedGame : game));
      setGames(updatedState);
      setLatestGames(updatedState);
      navigate(`/catalog/${id}`);
    } catch (error) {
      alert(error.message);
    }
  };

  const onDeleteSubmit = async ({ _id }) => {
    const id = _id;
    try {
      await gameService.deleteGame(id);
      const updatedState = (state) => state.filter((game) => game._id !== id);
      setGames(updatedState);
      setLatestGames(updatedState);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  // TODO check if the two arrays are equal and skip the setter function
  // How to compare arrays in JavaScript?
  // https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
  // Object comparison in JavaScript [duplicate]
  // https://stackoverflow.com/questions/1068834/object-comparison-in-javascript/1144249#1144249
  const searchGamesHandler = (searchResults) => {
    // console.time('diff');
    setGames(searchResults);
    // console.timeEnd('diff');
    // diff: 0ms - timer ended
  };

  // Comments functionality
  const createComment = async (gameId, commentsData) => {
    const { subject, content } = commentsData;
    try {
      const result = await commentService.createComment(gameId, {
        subject,
        content,
      });
      return result;
    } catch (error) {
      alert(error.message);
    }
  };

  const contextValues = {
    games,
    latestGames,
    loading,
    searchGamesHandler,
    onCreateSubmit,
    onEditSubmit,
    onDeleteSubmit,
    createComment,
  };

  return (
    <GameContext.Provider value={contextValues}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  return context;
};

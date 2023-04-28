import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  gameServiceFactory,
  getAllGames,
  getLatestsGames,
  searchGames,
} from "../services/gameService";
import { commentServiceFactory } from "../services/commentService";

import { useAuthContext } from "./AuthContext";

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

  // Second useEffect is used for checking latestGames.length updates
  useEffect(() => {
    if (latestGames.length < limit) {
      setLatestGames(games.slice(-limit).reverse());
    }
  }, [latestGames.length, games]);

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
      navigate("/");
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
      navigate(`/`);
    } catch (error) {
      alert(error.message);
    }
  };

  const addGameToFavorites = async (gameId) => {
    try {
      // TODO the result is the whole game, so we can add game title to success message
      await gameService.addGameToFavorites(gameId);
    } catch (error) {
      alert(error.message);
    }
  };

  // TODO see examples for search in React
  // Make own useState and then check if it's necessary to render search or games state.
  // If there are search results, just show them and keep games state untouched.
  const searchGamesHandler = async (title) => {
    // TODO compare the old state and if there are no changes, don't set new one.
    try {
     const search = await searchGames(title);
     setGames(search)
    } catch (error) {
      alert(error.message);
    }
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
    addGameToFavorites,
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

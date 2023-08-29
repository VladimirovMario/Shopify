export default function favoritesGamesReducer(favorites, action) {
  switch (action.type) {
    case 'INITIAL_FAVORITES': {
      return [...action.favorites];
    }
    case 'FAVORITE_REMOVE': {
      return favorites.filter((f) => f._id !== action.gameId);
    }
    case 'FAVORITE_ADD': {
      const { _id, imageUrl, price, title } = action.favorite;
      return [{ _id, imageUrl, price, title }, ...favorites];
    }
    default:
      throw Error(`Unknown action: ${action.type}`);
  }
}

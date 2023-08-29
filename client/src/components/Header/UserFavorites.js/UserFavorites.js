import styles from '../Header.module.css';
import { useFavoritesContext } from '../../../contexts/GameFavoritesContext';
import { Link } from 'react-router-dom';

export default function UserFavorites() {
  const { favoritesGames } = useFavoritesContext();
  const favoritesNumber = favoritesGames.length;

  return (
    <Link to={'/auth/favorites'}>
      <div className={styles['wishlist-icon-wrapper']}>
        <img src="/static/icons/heart(128).png" alt="wishlist-icon" />
        {favoritesNumber > 0 && (
          <div className={styles['wishlist-count']}>
            <span>{favoritesNumber}</span>
          </div>
        )}
      </div>
    </Link>
  );
}

import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useFavoritesContext } from '../../contexts/GameFavoritesContext';
import { textSubstring } from '../../utils/textSubstring';
import { IconHeart, IconCartShopping } from '../SVG/index';

import styles from './ProductPs4.module.css';

export default function ProductPs4({
  _id,
  description,
  genre,
  imageUrl,
  price,
  title,
}) {
  const { isAuthenticated } = useAuthContext();
  const { favoritesGames, dispatch, addGameToFavorites } =
    useFavoritesContext();

  const navigate = useNavigate();

  // Checking if the user already add this game to his favorites
  const notInFavoritesList = favoritesGames.every((f) => f._id !== _id);

  async function onClickAddFavorite(e) {
    e.preventDefault();

    if (notInFavoritesList) {
      const favorite = await addGameToFavorites(_id);
      dispatch({
        type: 'FAVORITE_ADD',
        favorite,
      });
    }
    // TODO Implement a message of success and stay on current page and browse for more
    navigate('/auth/favorites');
  }

  return (
    <li>
      <Link className={styles['product-box']} to={`/catalog/${_id}`}>
        <article className={styles['card']}>
          <div className={styles['thumbnail']}>
            <img
              className={styles['thumbnail-img']}
              src={imageUrl}
              alt="Unsplash img"
            />
          </div>
          <div className={styles['content']}>
            <h2 className={styles['content-title']}>
              {textSubstring(title, 'title')}
            </h2>
            <p className={styles['content-genre']}>
              Genre: {textSubstring(genre, 'genre')}
            </p>
            <p className={styles['content-desc']}>
              {textSubstring(description, 'description')}
            </p>

            <div className={styles['icon-wrapper']}>
              <p className={styles['content-price']}>{price}$</p>

              {/* Action container */}
              <div className={styles['action-icons']}>
                {/* <!-- Authenticated users only --> */}
                {isAuthenticated && (
                  <span
                    className={`${styles['heart-icon']} btn`}
                    onClick={(e) => onClickAddFavorite(e)}
                    aria-label="Add item to favorite"
                  >
                    <IconHeart />
                  </span>
                )}

                {/* Shopping cart button */}
                <span
                  className={`${styles['shopping-icon']} btn`}
                  aria-label="Shopping cart"
                >
                  <IconCartShopping />
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </li>
  );
}

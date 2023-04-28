import { Link } from "react-router-dom";
import { textSubstring } from "../../../../utils/textSubstring";
import styles from "./ProfileProduct.module.css";

export const ProfileProducts = ({
  _id,
  imageUrl,
  price,
  title,
  onFavoriteRemoveHandler,
}) => {
  const onFavoriteRemoveClick = (e, gameId) => {
    e.preventDefault();
    onFavoriteRemoveHandler(gameId);
  };

  const onCartShoppingClick = (e, gameId)=> {
    e.preventDefault();
    // TODO make cart page
    console.log('Add this id to shopping page', gameId);
  }

  return (
    <li>
      <Link className={styles["product-box"]} to={`/catalog/${_id}`}>
        <article className={styles["card"]}>
          <div
            onClick={(e) => onFavoriteRemoveClick(e, _id)}
            className={styles["remove-item-wrapper"]}
          >
            <i
              className={`${styles["remove-icon"]} fa-regular fa-trash-can`}
            ></i>
          </div>

          <div className={styles["thumbnail"]}>
            <img
              className={styles["thumbnail-img"]}
              src={imageUrl}
              alt={`${title}.jpg`}
            />
          </div>

          <div className={styles["content"]}>
            <h3 className={styles["content-title"]}>
              {title ? textSubstring(title, 28) : title}
            </h3>
            <div className={styles["icon-wrapper"]}>
              <p className={styles["content-price"]}>{price}$</p>

              <div className={styles["icon-btn"]}>
                <span onClick={(e) => onCartShoppingClick(e, _id)} className={`${styles["shopping-icon"]} btn`}>
                  <i className="fa-solid fa-cart-shopping"></i>
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </li>
  );
};

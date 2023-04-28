import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useGameContext } from "../../contexts/GameContext";
import { textSubstring } from "../../utils/textSubstring";
import styles from "./ProductPs4.module.css";

// users: Array []

export default function ProductPs4({
  _id,
  _ownerId,
  created_at,
  description,
  genre,
  imageUrl,
  price,
  title,
  updatedAt,
  users,
  usersCount,
}) {
  const { userId, isAuthenticated } = useAuthContext();
  const { addGameToFavorites } = useGameContext();
  const navigate = useNavigate();

  const onClickAddFavorite = async (e) => {
    e.preventDefault(); 
    // Checking if the user already add this game to his favorites
    if (users.includes(userId) === false) {
      addGameToFavorites(_id);
    }
    // navigate in every case
    // TODO Implement a message of success and stay on current page and browse for more
    navigate("/auth/profile");
  };

  return (
    <li>
      <Link className={styles["product-box"]} to={`/catalog/${_id}`}>
        <article className={styles["card"]}>
          <div className={styles["thumbnail"]}>
            <img
              className={styles["thumbnail-img"]}
              src={imageUrl}
              alt="Unsplash img"
            />
          </div>
          <div className={styles["content"]}>
            <h2 className={styles["content-title"]}>
              {textSubstring(title, "title")}
            </h2>
            <p className={styles["content-genre"]}>
              Genre: {textSubstring(genre, "genre")}
            </p>
            <p className={styles["content-desc"]}>
              {textSubstring(description, "description")}
            </p>

            <div className={styles["icon-wrapper"]}>
              <p className={styles["content-price"]}>{price}$</p>

              <div className={styles["icon-btn"]}>
                {/* <!-- User only --> */}
                {isAuthenticated && (
                  <span
                    className={`${styles["heart-icon"]} btn`}
                    onClick={(e) => onClickAddFavorite(e)}
                  >
                    <i className="fa-regular fa-heart"></i>
                  </span>
                )}

                <span className={`${styles["shopping-icon"]} btn`}>
                  <i className="fa-solid fa-cart-shopping"></i>
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </li>
  );
}

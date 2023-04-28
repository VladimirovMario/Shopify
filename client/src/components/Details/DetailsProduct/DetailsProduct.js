import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useGameContext } from "../../../contexts/GameContext";
import styles from "./DetailsProduct.module.css";

export default function DetailsProduct({ game }) {
  const { userId, isAuthenticated } = useAuthContext();
  const { addGameToFavorites } = useGameContext();
  const navigate = useNavigate();

  const isOwner = userId ? userId === game._ownerId : false;

  const onClickAddFavorite = async (e) => {
    e.preventDefault();
    // Checking if the user already add this game to his favorites
    if (game.users.includes(userId) === false) {
      addGameToFavorites(game._id);
    }
    // navigate in every case
    // TODO Implement a message of success and stay on current page and browse for more
    navigate("/auth/profile");
  };

  return (
    <div className={styles["details-card"]}>
      <div className={styles["details-image-wrapper"]}>
        <img
          className={styles["details-card-image"]}
          src={game.imageUrl}
          alt={`${game.title}.png`}
        />
      </div>
      <article className={styles["card-content"]}>
        <h2 className={styles["card-content-title"]}>{game.title}</h2>
        <p className={styles["content-genre"]}>Genre: {game.genre}</p>
        <p className={styles["content-desc"]}>{game.description}</p>
        <div className={styles["desc-divider"]}></div>

        <div className={styles["icon-wrapper"]}>
          <p className={styles["content-price"]}>{game.price}$</p>
          <div className={"icon-btn"}>
            {/* <!-- User only --> */}
            {isAuthenticated && (
              <button
                onClick={onClickAddFavorite}
                className={`${styles["heart-icon"]} btn`}
              >
                <i className="fa-regular fa-heart"></i>
              </button>
            )}
            <button className={`${styles["shopping-icon"]} btn`}>
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
          </div>
        </div>

        {/* <!-- If there is no registered user, do not display buttons--> */}
        <div className={styles["buttons-wrapper"]}>
          {isOwner && (
            <>
              <Link to={`/edit/${game._id}`} className={`btn-edit btn`}>
                Edit
              </Link>
              <Link to={`/delete/${game._id}`} className={"btn-delete btn"}>
                Delete
              </Link>
            </>
          )}

          {isAuthenticated && !isOwner && (
            <Link
              className={"btn-comments btn"}
              to={`/create-comment/${game._id}`}
            >
              Comments
            </Link>
          )}
        </div>
      </article>
    </div>
  );
}

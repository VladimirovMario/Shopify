import { useEffect, useState } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import {
  gameServiceFactory,
  getUserFavorites,
} from "../../../services/gameService";
import styles from "./Profile.module.css";
import { ProfileProducts } from "./ProfileProducts/ProfileProducts";

// TODO implement logic to display all user comments
export default function Profile() {
  const { userId, userEmail, userUsername, token } = useAuthContext();
  const [favoriteGames, setFavoriteGames] = useState([]);
  const gameService = gameServiceFactory(token);

  useEffect(() => {
    getUserFavorites(userId)
      .then((res) => {
        setFavoriteGames(res);
      })
      .catch((error) => {
        alert(error);
      });
  }, [userId, favoriteGames.length]);

  const onFavoriteRemoveHandler = async (gameId) => {
    // TODO the result is the whole game,
    // so we can add game title to inform the user what he removed
    try {
      await gameService.removeGameFromFavorites(gameId);
      setFavoriteGames((state) => state.filter((game) => game._id !== gameId));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className="section">
      <h2 className="section-title">Full Profile Information</h2>
      <div className="section-divider"></div>

      <article className={`${styles["profile-card"]} action-container`}>
        <article className={styles["profile-card-info"]}>
          <h2>Welcome, {userUsername}!</h2>
          <h3>Email: {userEmail}</h3>
          {/* <!--If the user has shared publications, separate their titles with a comma and a space (, )--> */}
          {/* <h4>Titles of shared posts by the user: </h4> */}
          {/* <!--If not display:--> */}
          {/* <!--<h4>Titles of shared posts by the user: Not yet.</h4>--> */}

          {/* <!--If the user has created their own publications, separate their titles with a comma and a space (, )--> */}
          {/* <h4>Titles of which the user is the author:</h4> */}
          {/* <!--If not display:--> */}
          {/* <!--<h4>Titles of which the user is the author: Not yet.</h4>--> */}

          {(!favoriteGames.length && (
            <h4>You don't have favorite products yet!</h4>
          )) || <h4>Favorite products list: {favoriteGames.length}</h4>}

          {favoriteGames.map((game) => (
            <p key={game._id}>{game.title}, </p>
          ))}
        </article>

        <div className={styles["profile-card-icon"]}>
          <img src="/static/images/vip-user.png" alt="vip-user.png" />
        </div>
      </article>

      <div className={styles["product-wrapper"]}>
        <ul className={styles["product-ul"]}>
          {favoriteGames.map((game) => (
            <ProfileProducts
              key={game._id}
              {...game}
              onFavoriteRemoveHandler={onFavoriteRemoveHandler}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

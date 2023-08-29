import { useAuthContext } from '../../../contexts/AuthContext';
import { useFavoritesContext } from '../../../contexts/GameFavoritesContext';

import styles from './Profile.module.css';

// TODO expand the logic
export default function Profile() {
  const { userEmail, userUsername } = useAuthContext();
  const { favoritesGames } = useFavoritesContext();

  return (
    <section className="section">
      <h2 className="section-title">Profile Information</h2>
      <div className="section-divider"></div>

      <article className={`${styles['profile-card']} action-container`}>
        <article className={styles['profile-card-info']}>
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
          {(!favoritesGames.length && (
            <h4>You don't have favorite products yet!</h4>
          )) || <h4>Favorite products list: {favoritesGames.length}</h4>}

          {favoritesGames.map((game) => (
            <p key={game._id}>{game.title}, </p>
          ))}
        </article>

        <div className={styles['profile-card-icon']}>
          <img src="/static/images/vip-user.png" alt="vip-user.png" />
        </div>
      </article>
    </section>
  );
}

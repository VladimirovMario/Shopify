import { useFavoritesContext } from '../../../contexts/GameFavoritesContext';
import NoContent from '../../Shared/NoContent/NoContent';
import ProductGridWrapper from '../../Shared/ProductGridWrapper/ProductGridWrapper';
import ProfileProducts from './ProfileProducts/ProfileProducts';

export default function Favorites() {
  const { favoritesGames } = useFavoritesContext();

  return (
    <section className="section">
      <h2 className="section-title">Your Favorites List</h2>
      <div className="section-divider"></div>

      <ProductGridWrapper>
        {favoritesGames.map((game) => (
          <ProfileProducts key={game._id} {...game} />
        ))}
      </ProductGridWrapper>

      {!favoritesGames.length && (
        <NoContent>
          <h3>Your Favorites List is Empty</h3>
          <p>
            Start adding your favorite games to the list and keep track of them
            all in one place!
          </p>
        </NoContent>
      )}
    </section>
  );
}

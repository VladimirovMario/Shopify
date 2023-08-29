import { useGameContext } from '../../contexts/GameContext';
import { Loader } from '../Shared/Loader/Loader';
import ProductPs4 from '../ProductPs4/ProductPs4';

import ProductGridWrapper from '../Shared/ProductGridWrapper/ProductGridWrapper';
import NoContent from '../Shared/NoContent/NoContent';

export default function Catalog() {
  const { games, loading } = useGameContext();

  return (
    <section className="section">
      <h2 className="section-title">Games for ps4</h2>
      <div className="section-divider"></div>

      {/* Loading component*/}
      {loading && <Loader />}

      {/*  Products */}
      <ProductGridWrapper>
        {!loading &&
          games.map((game) => <ProductPs4 key={game._id} {...game} />)}
      </ProductGridWrapper>

      {/* No content */}
      {!games.length && (
        <NoContent>
          <h3>No publications yet. Be the first one.</h3>
        </NoContent>
      )}
    </section>
  );
}

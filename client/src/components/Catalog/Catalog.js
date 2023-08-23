import { useGameContext } from '../../contexts/GameContext';
import { Loader } from '../Shared/Loader/Loader';
import ProductPs4 from '../ProductPs4/ProductPs4';

import styles from './Catalog.module.css';

export default function Catalog() {
  const { games, loading } = useGameContext();

  return (
    <section className="section">
      <h2 className={`${styles['section-title']} section-title`}>
        Games for ps4
      </h2>
      <div className="section-divider"></div>

      {/* <!-- Products --> */}
      <div className={styles['product-wrapper']}>
        {/* Loading component*/}
        {loading && <Loader />}

        <ul className={styles['product-ul']}>
          {!loading &&
            games.map((game) => <ProductPs4 key={game._id} {...game} />)}
        </ul>
        {!games.length && (
          <h3 className={styles['no-publications']}>
            No publications yet. Be the first one.
          </h3>
        )}
      </div>
    </section>
  );
}

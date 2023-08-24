import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useGameContext } from '../../../contexts/GameContext';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const { searchGamesHandler } = useGameContext();
  const [searchParams, setSearchParams] = useSearchParams({ search: '' });
  const searchQuery = searchParams.get('search');
  const location = useLocation();
  const navigate = useNavigate();

  function handleSearchInputChange(e) {
    setSearchParams({ search: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();

    if (searchQuery && searchQuery.trim() !== '') {
      if (location.pathname !== '/catalog') {
        navigate('/catalog', { state: location.search });
      }
      searchGamesHandler(searchQuery.trim());
    } else {
      searchGamesHandler('');
      setSearchParams({});
    }
  }

  return (
    <form onSubmit={onSubmit} className={styles['search-bar']}>
      <label htmlFor="search" className={styles.label}>
        <span className={styles['visually-hidden']}>Search for games:</span>
      </label>
      <input
        className={styles['search-input']}
        id="search"
        type="search"
        autoComplete="off"
        placeholder="Start searching for..."
        name="search"
        value={searchQuery || ''}
        onChange={handleSearchInputChange}
        aria-label="Search games"
      />

      <button
        className={styles['search-btn']}
        type="submit"
        aria-label="Search"
      >
        <div className={styles['search-icon']}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </button>
    </form>
  );
}

import { useDeferredValue, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useGameContext } from '../../../contexts/GameContext';
import { searchGames } from '../../../services/gameService';
import DropDownBox from './DropDownBox';

import styles from './SearchBar.module.css';

export default function SearchBar() {
  const { searchGamesHandler } = useGameContext();
  const location = useLocation();
  const navigate = useNavigate();

  // State and search-related hooks
  const [searchParams, setSearchParams] = useSearchParams({ search: '' });
  const [search, setQuery] = useState(searchParams.get('search'));
  const deferredSearchQuery = useDeferredValue(search);

  // State for search results and dropdown visibility
  const [searchResults, setSearchResults] = useState([]);
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);

  // Fetch search results based on the deferred search query
  useEffect(() => {
    fetchSearchResults();
    async function fetchSearchResults() {
      try {
        const result = await searchGames(deferredSearchQuery);
        setSearchResults(result);
      } catch (error) {
        alert(error.message);
      }
    }
  }, [deferredSearchQuery]);

  // Handle user input change in the search input field
  function handleSearchInputChange(e) {
    setQuery((search) => (search = e.target.value));
    setIsDropDownVisible(true);
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    setSearchParamsAndNavigate();
    searchGamesHandler(searchResults);
  }

  // Set search parameters and navigate based on user input
  function setSearchParamsAndNavigate() {
    setSearchParams({ search });
    setIsDropDownVisible(false);

    if (search && search.trim() !== '') {
      if (location.pathname !== '/catalog') {
        navigate('/catalog', { state: location.search });
      }
    } else {
      setSearchParams({});
    }
  }

  // Reset dropdown visibility and search query
  function resetDropDown() {
    setIsDropDownVisible(false);
    setQuery('');
  }

  // Check if the search query is stale for deferred rendering
  const isSearchStale = search !== deferredSearchQuery;
  // Get class name for dropdown content based on staleness
  const dropDownClassName = getDropDownClassName(isSearchStale);

  return (
    <div className={styles['search-bar-wrapper']}>
      <form onSubmit={handleSubmit} className={styles['search-bar']}>
        {/* Label for search input */}
        <label htmlFor="search" className={styles['visually-hidden']}>
          <span>Search for games:</span>
        </label>
        {/* Search input */}
        <input
          className={styles['search-input']}
          id="search"
          type="search"
          autoComplete="off"
          placeholder="Start searching for..."
          name="search"
          value={search || ''}
          onChange={handleSearchInputChange}
          aria-label="Search games"
        />

        {/* Search button */}
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

      {/* Display dropdown if search query and dropdown visibility */}
      {search && isDropDownVisible && (
        <ul className={dropDownClassName}>
          {searchResults.slice(0, 5).map((game) => (
            <DropDownBox
              key={game._id}
              game={game}
              resetDropDown={resetDropDown}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

// Function to get class name for dropdown content
function getDropDownClassName(isStale) {
  let className = styles['search-content'];
  if (isStale) {
    className += ` ${styles['stale']}`;
  } else {
    className += ` ${styles['not-stale']}`;
  }
  return className;
}

import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './DropDownBox.module.css';

const DropDownBox = memo(function DropDownBox({ game, resetDropDown }) {
  const navigate = useNavigate();

  // Handle result click and navigation
  function handleResultClick(e, gameId) {
    e.preventDefault();
    resetDropDown();
    navigate(`/catalog/${gameId}`);
  }

  return (
    <li onClick={(e) => handleResultClick(e, game._id)}>
      <Link
        className={styles['search-result-wrapper']}
        to={`/catalog/${game._id}`}
      >
        <img src={game.imageUrl} height="40px" width="40px" alt={game.title} />
        <p>{game.title}</p>
      </Link>
      <div className={styles['drop-down-divider']}></div>
    </li>
  );
});

export default DropDownBox;

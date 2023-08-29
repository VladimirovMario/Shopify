import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CommentsList from './Comments/CommentsList/CommentsList';
import DetailsProduct from './DetailsProduct/DetailsProduct';

import { getById } from '../../services/gameService';
import { getCommentsById } from '../../services/commentService';

import styles from './Details.module.css';

export default function Details() {
  const { gameId } = useParams();
  const [game, setGame] = useState({});

  useEffect(() => {
    Promise.all([getById(gameId), getCommentsById(gameId)])
      .then(([gameData, comments]) => {
        setGame({
          ...gameData,
          comments,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
    // TODO optimize it
  }, [gameId, game.comments?.length]);

  return (
    <section id="details" className={`${styles['details']} section`}>
      <h2 className="section-title">Details</h2>
      <div className="section-divider"></div>

      <DetailsProduct game={game} />

      <CommentsList comments={game?.comments} />
    </section>
  );
}

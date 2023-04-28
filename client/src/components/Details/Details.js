import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CommentsList from "./Comments/CommentsList/CommentsList";
import DetailsProduct from "./DetailsProduct/DetailsProduct";

import styles from "./Details.module.css";
import { getById } from "../../services/gameService";
import { getCommentsById } from "../../services/commentService";

export default function Details() {
  const { gameId } = useParams();
  const [game, setGame] = useState({});

  useEffect(() => {
    Promise.all([getById(gameId), getCommentsById(gameId)]).then(
      ([gameData, comments]) => {
        setGame({
          ...gameData,
          comments,
        });
      }
    );
    // TODO optimize it 
    // I have to think how to change the state without re render.
  }, [gameId, game.comments?.length]);

  return (
    <section id="details" className={`${styles["details"]} section`}>
      <h2 className="section-title">Details</h2>
      <div className="section-divider"></div>
 
      <DetailsProduct game={game} />

      <CommentsList comments={game?.comments} />

    </section>
  );
}

import { Fragment } from "react";
import styles from "./Comment.module.css";

export default function Comment({ comment }) {
  return (
    <Fragment>
      <article className={styles["content-publication"]}>
        <div className={styles["author-wrapper"]}>
          <div className={styles["author-img-wrapper"]}>
            <img
              className={styles["author-img"]}
              src={"/static/images/vip-user.png"}
              alt=""
            />
          </div>
          <p className={styles["author-name"]}>{comment.author?.username}</p>
          <p>{comment.created_at.substring(0, 10)} {comment.created_at.substring(11, 19)}</p>
        </div>
        <div className={styles["publication-wrapper"]}>
          <h3 className={styles["publication-title"]}>{comment.subject}</h3>
          <p className={styles["publication-desc"]}>{comment.content}</p>
        </div>
      </article>
    </Fragment>
  );
}

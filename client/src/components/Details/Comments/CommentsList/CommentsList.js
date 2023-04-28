import Comment from "../Comment/Comment";
import styles from "../Comment/Comment.module.css";

export default function CommentsList({ comments }) {
  return (
    <div className={styles["details-comments"]}>
      <h2 className={styles["comments-title"]}>Comments</h2>
      <div className="section-divider"></div>

      {comments?.length > 0 &&
        comments?.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}

      {!comments?.length && (
        <article className={styles["content-publication"]}>
          <h3 className={styles["no-publication-title"]}>
            There are no publications yet.
          </h3>
        </article>
      )}
    </div>
  );
}

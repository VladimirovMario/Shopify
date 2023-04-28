import styles from "./Error.module.css";

export default function Error() {
  return (
    // In case of error, you should display div with class "error-box"
    <div className={styles["error-box"]}>
      <p className={styles["error-desc"]}>Error</p>
    </div>
  );
}

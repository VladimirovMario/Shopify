import styles from "./Success.module.css";

export default function Success() {
  return (
    // In case of success, you should display div with class "success-box"
    <div className={styles["success-box"]}>
      <p className={styles["success-desc"]}>success</p>
    </div>
  );
}

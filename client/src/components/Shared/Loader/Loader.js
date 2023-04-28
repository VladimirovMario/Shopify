import styles from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={styles["lds-wrapper"]}>
      <div className={styles["lds-message"]}>This may take a few breaths. Inhale, exhale&hellip;</div>
      <div className={styles["loading"]}>
        <div className={styles["loading-interior"]}></div>
      </div>
    </div>
  );
};

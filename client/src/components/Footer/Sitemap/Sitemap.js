import { Link } from "react-router-dom";
import styles from "./Sitemap.module.css";

export default function Sitemap() {
  return (
    <div className={styles.sitemap}>
      <h3 className={styles["sitemap-title"]}>Sitemap</h3>

      <ul className={styles["sitemap-ul"]}>
        <li className={styles["sitemap-item"]}>
          <Link className={styles["sitemap-item-link"]} to="/">
            Home
          </Link>
        </li>
        <li className={styles["sitemap-item"]}>
          <Link className={styles["sitemap-item-link"]} to="/about">
            About us
          </Link>
        </li>
        <li className={styles["sitemap-item"]}>
          <Link className={styles["sitemap-item-link"]} to="/services">
            Services
          </Link>
        </li>
        <li className={styles["sitemap-item"]}>
          <Link className={styles["sitemap-item-link"]} to="/blog">
            Blog
          </Link>
        </li>
        <li className={styles["sitemap-item"]}>
          <Link className={styles["sitemap-item-link"]} to="/contacts">
            Contacts
          </Link>
        </li>
        <li className={styles["sitemap-item"]}>
          <Link className={styles["sitemap-item-link"]} to="/terms">
            Terms
          </Link>
        </li>
        <li className={styles["sitemap-item"]}>
          <Link className={styles["sitemap-item-link"]} to="/privacy-policy">
            Privacy
          </Link>
        </li>
      </ul>
    </div>
  );
}

import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <section className="page-content section">
      <h2 className="section-title">Page Not Found</h2>
      <div className="section-divider"></div>

      <div className={styles["not-found"]}>
        <h2 className={styles["not-found-title"]}>404</h2>
        <p className={styles["not-found-desc"]}>
          The Page you are looking for doesn't exist or another error occurred.
          Go to
          <Link className={styles["not-found-link"]} to="/">
            Shopify
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

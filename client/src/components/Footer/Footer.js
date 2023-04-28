import styles from "./Footer.module.css";
// TODO extract: Sitemap and Contacts
export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* <!-- Footer section --> */}
      <section className={`section ${styles["footer-section"]}`}>
        <div className={styles["section-divider"]}></div>

        <div className={styles["footer-wrapper"]}>
          {/* <!-- Site info --> */}
          <div className={styles["site-info"]}>
            <h2 className={styles["site-info-title"]}>Shopify</h2>
            <p className={styles["site-info-desc"]}>
              We are the best web gurus you will ever have the pleasure to
              encounter. We are amazing!
            </p>
          </div>

          {/* <!-- Sitemap --> */}
          <div className={styles.sitemap}>
            <h3 className={styles["sitemap-title"]}>Sitemap</h3>

            <ul className={styles["sitemap-ul"]}>
              <li className={styles["sitemap-item"]}>
                <a className={styles["sitemap-item-link"]} href="/TODO">
                  Home
                </a>
              </li>
              <li className={styles["sitemap-item"]}>
                <a className={styles["sitemap-item-link"]} href="/TODO">
                  About us
                </a>
              </li>
              <li className={styles["sitemap-item"]}>
                <a className={styles["sitemap-item-link"]} href="/TODO">
                  Services
                </a>
              </li>
              <li className={styles["sitemap-item"]}>
                <a className={styles["sitemap-item-link"]} href="/TODO">
                  Blog
                </a>
              </li>
              <li className={styles["sitemap-item"]}>
                <a className={styles["sitemap-item-link"]} href="/TODO">
                  Contacts
                </a>
              </li>
              <li className={styles["sitemap-item"]}>
                <a className={styles["sitemap-item-link"]} href="/TODO">
                  Terms
                </a>
              </li>
              <li className={styles["sitemap-item"]}>
                <a className={styles["sitemap-item-link"]} href="/TODO">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* <!-- Contacts --> */}
          <div className={styles.contacts}>
            <h3 className={styles["contacts-title"]}>Contacts</h3>

            <div className={styles["contact-wrapper"]}>
              <i className="fa-solid fa-phone"></i>
              <p>0700 12 345</p>
            </div>
            <div className={styles["contact-wrapper"]}>
              <i className="fa-solid fa-envelope"></i>
              <p>office@shopify.com</p>
            </div>
            <div className={styles["contact-wrapper"]}>
              <i className="fa-solid fa-clock"></i>
              <p>Monday - Friday: 09:00 - 18:00</p>
            </div>
            <div className={styles["contact-wrapper"]}>
              <i className="fa-solid fa-map-location-dot"></i>
              <p>15 Some Place Str.</p>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}

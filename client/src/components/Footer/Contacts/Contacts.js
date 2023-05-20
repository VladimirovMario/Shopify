import styles from "./Contacts.module.css";

export default function Contacts() {
  return (
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
  );
}

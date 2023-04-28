import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="hero" className={`${styles.hero} section`}>
      <div className={styles["hero-content"]}>
        <h1 className={styles["hero-title"]}>Find the way forward</h1>
        <h2 className={styles["hero-subtitle"]}>
          browse <span className={styles["site-title"]}>Shopify</span> store
        </h2>
        <img
          className={styles["hero-img"]}
          src="/static/images/hero-img.jpg"
          alt="hero-img.jpg"
        />
      </div>
    </section>
  );
}

import styles from './SiteInfo.module.css';

export default function SiteInfo() {
  return (
    <div className={styles['site-info']}>
      <h3 className={styles['site-info-title']}>Shopify</h3>
      <p className={styles['site-info-desc']}>
        We are the best web gurus you will ever have the pleasure to encounter.
        We are amazing!
      </p>
    </div>
  );
}

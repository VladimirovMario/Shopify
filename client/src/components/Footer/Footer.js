import Contacts from './Contacts/Contacts';
import styles from './Footer.module.css';
import SiteInfo from './SiteInfo/SiteInfo';
import Sitemap from './Sitemap/Sitemap';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <section className={`section ${styles['footer-section']}`}>
        <div className={'section-divider'}></div>

        <div className={styles['footer-wrapper']}>
          <SiteInfo />
          <Sitemap />
          <Contacts />
        </div>
      </section>
    </footer>
  );
}

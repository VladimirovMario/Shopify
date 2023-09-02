import {
  IconPhone,
  IconEnvelope,
  IconClock,
  IconMapLocationDot,
} from '../../SVG/index';
import styles from './Contacts.module.css';

export default function Contacts() {
  return (
    <div className={styles.contacts}>
      <h3 className={styles['contacts-title']}>Contacts</h3>

      <div className={styles['contact-wrapper']}>
        <IconPhone />
        <p>0700 12 345 67</p>
      </div>
      <div className={styles['contact-wrapper']}>
        <IconEnvelope />
        <p>office@shopify.com</p>
      </div>
      <div className={styles['contact-wrapper']}>
        <IconClock />
        <p>Monday - Friday: 09:00 - 18:00</p>
      </div>
      <div className={styles['contact-wrapper']}>
        <IconMapLocationDot />
        <p>15 Some Place Str.</p>
      </div>
    </div>
  );
}

import styles from './NewArrivals.module.css';

export default function NewArrivals() {
  return (
    <div className={styles['image-wrapper']}>
      <img
        className={styles['arrivals-image']}
        src="/static/new-arrivals/new-arrivals.jpg"
        alt="new-arrivals.jpg"
      />
    </div>
  );
}

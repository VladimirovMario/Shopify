import styles from './ProductGridWrapper.module.css';

export default function ProductGridWrapper({ children }) {
  return (
    <div className={styles['product-wrapper']}>
      <ul className={styles['product-ul']}>{children}</ul>
    </div>
  );
}

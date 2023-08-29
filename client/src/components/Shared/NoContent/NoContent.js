import styles from './NoContent.module.css';

export default function NoContent({ children }) {
  return <div className={styles['no-publications']}>{children}</div>;
}

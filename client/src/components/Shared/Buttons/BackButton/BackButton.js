import styles from './BackButton.module.css';

export default function BackButton({ handleBackClick }) {
  return (
    <button
      className={`${styles['back-btn']} back-btn btn`}
      onClick={handleBackClick}
    >
      <div className={styles['back-btn-wrapper']}>
        <i className={`${styles['back-icon']} fa-solid fa-arrow-left`}></i>
      </div>
    </button>
  );
}

import { IconArrowLeft } from '../../../SVG/index';
import styles from './BackButton.module.css';

export default function BackButton({ handleBackClick, ariaLabelText }) {
  return (
    <button
      className={`${styles['back-btn']} back-btn btn`}
      onClick={handleBackClick}
      aria-label={ariaLabelText}
    >
      <div className={styles['back-btn-wrapper']}>
        <IconArrowLeft className={styles['back-icon']} />
      </div>
    </button>
  );
}

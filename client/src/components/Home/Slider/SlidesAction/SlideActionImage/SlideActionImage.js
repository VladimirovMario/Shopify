import Label from '../Label/Label';
import styles from './SlideActionImage.module.css';

export default function SlideActionImage({
  wantedSlide,
  id,
  isActive,
  onCheckboxHandler,
  isDisabled,
}) {
  return (
    <div className={styles['image-wrapper']}>
      <img src={wantedSlide.imageUrl} alt={wantedSlide.title} />
      <Label
        className={styles['input-label-checkbox']}
        inputId={`${id}-isActive`}
        spanText="Active promotion"
      >
        <input
          id={`${id}-isActive`}
          name="isActive"
          type="checkbox"
          checked={isActive}
          onChange={onCheckboxHandler}
          disabled={isDisabled}
        />
      </Label>
    </div>
  );
}

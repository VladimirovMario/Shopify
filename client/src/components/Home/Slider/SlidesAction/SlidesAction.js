import { useId, useState } from 'react';
import { useSlidesContext } from '../../../../contexts/PromotionSlidesContext';
import BackButton from '../../../Shared/Buttons/BackButton/BackButton';
import styles from '../Slider.module.css';
import Label from './Label/Label';
import Input from './Input/Input';

export default function SlidesAction({ selectedAction }) {
  const { wantedSlide, dispatch, resetSelectedSlide } = useSlidesContext();
  const id = useId();
  const [formValues, setFormValues] = useState({
    _id: wantedSlide._id,
    title: selectedAction === 'create' ? '' : wantedSlide.title,
    description: selectedAction === 'create' ? '' : wantedSlide.description,
    imageUrl: selectedAction === 'create' ? '' : wantedSlide.imageUrl,
    isActive: wantedSlide.isActive,
  });

  function onSubmit(e) {
    e.preventDefault();
    dispatch({
      type: `${selectedAction}`,
      id,
      slide: formValues,
    });
    resetSelectedSlide();
  }

  function onChange(e) {
    setFormValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  }

  function handleIsActive(e) {
    setFormValues((state) => ({ ...state, [e.target.name]: e.target.checked }));
  }

  function handleBackClick() {
    resetSelectedSlide();
  }

  const showImageContainer =
    selectedAction === 'edit' || selectedAction === 'delete';
  const isDisabled = selectedAction === 'delete';

  return (
    <>
      <div className={styles['action-section']}>
        <BackButton handleBackClick={handleBackClick} />
        <form onSubmit={onSubmit}>
          {/* Title input */}
          <Label
            className={styles['input-label']}
            inputId={`${id}-title`}
            spanText="Title"
          >
            <Input
              type="text"
              id={`${id}-title`}
              name="title"
              value={formValues.title}
              onChange={onChange}
              placeholder="Unleash Gaming Potential"
              disabled={isDisabled}
            />
          </Label>
          {/* Image url input */}
          <Label
            className={styles['input-label']}
            inputId={`${id}-imageUrl`}
            spanText="Image url"
          >
            <Input
              type="text"
              id={`${id}-imageUrl`}
              name="imageUrl"
              value={formValues.imageUrl}
              onChange={onChange}
              placeholder="https://"
              disabled={isDisabled}
            />
          </Label>

          <Label
            className={styles['input-label']}
            inputId={`${id}-description`}
            spanText="Description"
          >
            <textarea
              className={styles.description}
              id={`${id}-description`}
              name="description"
              value={formValues.description}
              onChange={onChange}
              placeholder="Find Perfect Match with PS4 and PS5 Games"
              cols="30"
              rows="3"
              disabled={isDisabled}
            />
          </Label>
          <input
            className={`action-btn ${selectedAction}-btn btn`}
            type="submit"
            value={selectedAction}
          />
        </form>
        {showImageContainer && (
          <div className={styles['image-wrapper']}>
            <img src={wantedSlide.imageUrl} alt={wantedSlide.title} />
            <Label
              className={styles['input-label-checkbox']}
              inputId={`${id}-isActive`}
              spanText="Active promotion"
            >
              <input
                className={styles['input-checkbox']}
                id={`${id}-isActive`}
                name="isActive"
                type="checkbox"
                checked={formValues.isActive}
                onChange={handleIsActive}
                disabled={isDisabled}
              />
            </Label>
          </div>
        )}
      </div>
    </>
  );
}

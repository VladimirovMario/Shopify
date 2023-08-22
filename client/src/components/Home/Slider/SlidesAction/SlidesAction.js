import { useId } from 'react';
import { useSlidesContext } from '../../../../contexts/PromotionSlidesContext';
import BackButton from '../../../Shared/Buttons/BackButton/BackButton';
import styles from '../Slider.module.css';
import Label from './Label/Label';
import Input from './Input/Input';
import { useForm } from '../../../../hooks/useForm';
import { getFieldsWithEmptyStrings } from '../../../../utils/getFieldsWithEmptyStrings';

export default function SlidesAction({ selectedAction }) {
  const {
    wantedSlide,
    dispatch,
    resetSelectedSlide,
    onCreateSubmit,
    onEditSubmit,
    onDeleteSubmit,
  } = useSlidesContext();

  const id = useId();

  const { values, errors, onChangeHandler, onValidateForm, onCheckboxHandler } =
    useForm({
      _id: selectedAction === 'create' ? '' : wantedSlide._id,
      title: selectedAction === 'create' ? '' : wantedSlide.title,
      slideDescription:
        selectedAction === 'create' ? '' : wantedSlide.slideDescription,
      imageUrl: selectedAction === 'create' ? '' : wantedSlide.imageUrl,
      isActive: selectedAction === 'create' ? true : wantedSlide.isActive,
    });

  async function onSubmit(e) {
    e.preventDefault();
    const slide = {};

    // Filter out fields with empty strings
    const fieldsWithEmptyStrings = getFieldsWithEmptyStrings(values);

    if (fieldsWithEmptyStrings.length === 0) {
      if (selectedAction === 'create') {
        const createdSlide = await onCreateSubmit(values);
        Object.assign(slide, createdSlide);
      }

      if (selectedAction === 'edit') {
        const editedSlide = await onEditSubmit(values);
        Object.assign(slide, editedSlide);
      }

      if (selectedAction === 'delete') {
        const deletedSlide = await onDeleteSubmit(values._id);
        Object.assign(slide, deletedSlide);
      }

      dispatch({
        type: `${selectedAction}`,
        slide,
      });

      resetSelectedSlide();
    } else {
      alert('All fields are required!');
    }
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
            error={errors.title}
          >
            <Input
              type="text"
              id={`${id}-title`}
              name="title"
              value={values.title}
              onChange={onChangeHandler}
              placeholder="Unleash Gaming Potential"
              disabled={isDisabled}
              onBlur={onValidateForm}
            />
          </Label>
          {/* Image url input */}
          <Label
            className={styles['input-label']}
            inputId={`${id}-imageUrl`}
            spanText="Image url"
            error={errors.imageUrl}
          >
            <Input
              type="text"
              id={`${id}-imageUrl`}
              name="imageUrl"
              value={values.imageUrl}
              onChange={onChangeHandler}
              placeholder="https://"
              disabled={isDisabled}
              onBlur={onValidateForm}
            />
          </Label>

          <Label
            className={styles['input-label']}
            inputId={`${id}-description`}
            spanText="Description"
            error={errors.slideDescription}
          >
            <textarea
              className={styles.description}
              id={`${id}-description`}
              name="slideDescription"
              value={values.slideDescription}
              onChange={onChangeHandler}
              placeholder="Find Perfect Match with PS4 and PS5 Games"
              cols="30"
              rows="3"
              disabled={isDisabled}
              onBlur={onValidateForm}
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
                checked={values.isActive}
                onChange={onCheckboxHandler}
                disabled={isDisabled}
              />
            </Label>
          </div>
        )}
      </div>
    </>
  );
}

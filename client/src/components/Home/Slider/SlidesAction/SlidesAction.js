import { useId } from 'react';
import { useSlidesContext } from '../../../../contexts/PromotionSlidesContext';
import { useForm } from '../../../../hooks/useForm';
import { getFieldsWithEmptyStrings } from '../../../../utils/getFieldsWithEmptyStrings';
import Label from './Label/Label';
import Input from './Input/Input';
import SlideActionImage from './SlideActionImage/SlideActionImage';
import BackButton from '../../../Shared/Buttons/BackButton/BackButton';
import styles from '../Slider.module.css';

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

  const isCreateAction = selectedAction === 'create';
  const isEditAction = selectedAction === 'edit';
  const isDeleteAction = selectedAction === 'delete';

  const { values, errors, onChangeHandler, onValidateForm, onCheckboxHandler } =
    useForm({
      _id: isCreateAction ? '' : wantedSlide._id,
      title: isCreateAction ? '' : wantedSlide.title,
      slideDescription: isCreateAction ? '' : wantedSlide.slideDescription,
      imageUrl: isCreateAction ? '' : wantedSlide.imageUrl,
      isActive: isCreateAction ? true : wantedSlide.isActive,
    });

  async function onSubmit(e) {
    e.preventDefault();
    const slide = {}; // Initialize an empty object to store the result of the action

    // Filter out fields with empty strings
    const fieldsWithEmptyStrings = getFieldsWithEmptyStrings(values);

    // Check if there are no empty string fields
    if (fieldsWithEmptyStrings.length === 0) {
      let submittedSlide;

      // Perform action based on selectedAction
      if (isCreateAction) {
        submittedSlide = await onCreateSubmit(values);
      }

      if (isEditAction) {
        submittedSlide = await onEditSubmit(values);
      }

      if (isDeleteAction) {
        submittedSlide = await onDeleteSubmit(values._id);
      }

      Object.assign(slide, submittedSlide);
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

  const showImageContainer = isEditAction || isDeleteAction;
  const isDisabled = isDeleteAction;

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
          <SlideActionImage
            wantedSlide={wantedSlide}
            id={id}
            isActive={values.isActive}
            onCheckboxHandler={onCheckboxHandler}
            isDisabled={isDisabled}
          />
        )}
      </div>
    </>
  );
}

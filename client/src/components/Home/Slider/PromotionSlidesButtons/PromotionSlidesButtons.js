import { useState } from 'react';
import { useSlidesContext } from '../../../../contexts/PromotionSlidesContext';
import BackButton from '../../../Shared/Buttons/BackButton/BackButton';
import SlidesAction from '../SlidesAction/SlidesAction';
import styles from '../Slider.module.css';

export default function PromotionSlidesButtons() {
  const { slides, resetSelectedSlide } = useSlidesContext();
  const [selectedAction, setSelectedAction] = useState('');

  function handleCreateClick() {
    setSelectedAction('create');
  }

  function handleEditClick() {
    setSelectedAction('edit');
  }

  function handleDeleteClick() {
    setSelectedAction('delete');
  }

  function handleBackClick() {
    resetSelectedSlide();
  }

  const disabledDelete = slides.length <= 1;

  let deleteBtnClass = 'action-btn delete-btn btn';
  if (disabledDelete) {
    deleteBtnClass = 'disabled action-btn delete-btn btn';
  }

  return (
    <>
      {!selectedAction && (
        <div className={styles['action-section']}>
          <button
            className={'action-btn create-btn btn'}
            onClick={handleCreateClick}
          >
            Create
          </button>
          <button
            className={'action-btn edit-btn btn'}
            onClick={handleEditClick}
          >
            Edit
          </button>
          <button
            className={deleteBtnClass}
            onClick={handleDeleteClick}
            disabled={disabledDelete}
          >
            {disabledDelete ? 'Final Content' : 'Delete'}
          </button>
          <BackButton
            handleBackClick={handleBackClick}
            ariaLabelText="Go to promotion slides home screen"
          />
        </div>
      )}
      {selectedAction && <SlidesAction selectedAction={selectedAction} />}
    </>
  );
}

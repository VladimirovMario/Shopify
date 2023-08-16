import { useState } from 'react';
import { useSlidesContext } from '../../../../contexts/PromotionSlidesContext';
import BackButton from '../../../Shared/Buttons/BackButton/BackButton';
import SlidesAction from '../SlidesAction/SlidesAction';
import styles from '../Slider.module.css';

export default function PromotionSlidesButtons() {
  const { resetSelectedSlide } = useSlidesContext();
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
            className={'action-btn delete-btn btn'}
            onClick={handleDeleteClick}
          >
            Delete
          </button>
          <BackButton handleBackClick={handleBackClick} />
        </div>
      )}
      {selectedAction && <SlidesAction selectedAction={selectedAction} />}
    </>
  );
}

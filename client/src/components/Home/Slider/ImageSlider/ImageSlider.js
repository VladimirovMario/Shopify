import { useCallback, useEffect, useRef, useState } from 'react';
import { useSlidesContext } from '../../../../contexts/PromotionSlidesContext';
import {
  IconChevronLeft,
  IconChevronRight,
  IconCircle,
} from '../../../SVG/index';
import styles from './ImageSlider.module.css';

// TO DO fix the problem with responsive design
export default function ImageSlider({ slides }) {
  const { onCurrentIndexClick } = useSlidesContext();

  const timerRef = useRef(null);
  const [currIndex, setCurrentIndex] = useState(0);
  const slideWidth = 730;

  const goToPrevious = () => {
    const isFirstSlide = currIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = useCallback(() => {
    const isLastSlide = currIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currIndex + 1;
    setCurrentIndex(newIndex);
  }, [currIndex, slides.length]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      goToNext();
    }, 6000);
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [goToNext]);

  // Styles
  const getSlidesStylesWithBackground = () => ({
    width: slideWidth * slides.length,
    transform: `translateX(${-(currIndex * slideWidth)}px)`,
  });

  const reverseFlexDirection = (slideIndex) =>
    slideIndex % 2 !== 0 ? { flexDirection: 'row-reverse' } : {};

  return (
    <div className={styles['promotion-slides']}>
      <div
        className={styles['container-slides']}
        style={getSlidesStylesWithBackground()}
      >
        {slides.map((slide, slideIndex) => (
          <article
            key={slide._id}
            className={styles['current-slide']}
            style={reverseFlexDirection(slideIndex)}
          >
            <div className={styles['slide-content']}>
              <h3 className={styles['slide-title']}>{slide.title}</h3>
              <p className={styles['slide-desc']}> {slide.slideDescription}</p>
            </div>
            <div className={styles['image-wrapper']}>
              <img
                className={styles['slide-img']}
                src={slide.imageUrl}
                alt={slide.title}
              />
            </div>
          </article>
        ))}
      </div>

      {/* arrow buttons logic */}
      <button
        className={styles['left-arrow']}
        aria-label="Go to previous promotion slide"
        onClick={goToPrevious}
      >
        <IconChevronLeft />
      </button>
      <button
        className={styles['right-arrow']}
        aria-label="Go to next promotion slide"
        onClick={goToNext}
      >
        <IconChevronRight />
      </button>

      {/* Dots section */}
      <div className={styles['dots-wrapper']}>
        {slides.map((slide, slideIndex) => (
          <button
            key={slideIndex}
            className={styles.dot}
            onClick={() => goToSlide(slideIndex)}
            aria-label={`Go to ${slide.title} promotion slide`}
          >
            <IconCircle />
          </button>
        ))}
      </div>

      <div className={styles['slide-editor-container']}>
        <button
          className={'slide-editor-btn action-btn btn'}
          onClick={() => onCurrentIndexClick(currIndex)}
        >
          Slide Editor
        </button>
      </div>
    </div>
  );
}

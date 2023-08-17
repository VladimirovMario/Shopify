import ImageSlider from './ImageSlider/ImageSlider';
import PromotionSlidesButtons from './PromotionSlidesButtons/PromotionSlidesButtons';
import NewArrivals from './NewArrivals/NewArrivals';

import { useSlidesContext } from '../../../contexts/PromotionSlidesContext';

import styles from './Slider.module.css';

export default function Slider() {
  const { slides, isSelectedSlide } = useSlidesContext();

  const availableSlides = slides.length > 0;

  return (
    <section className={`${styles['slider-section']} section`}>
      {!isSelectedSlide && availableSlides && <ImageSlider slides={slides} />}
      {isSelectedSlide && <PromotionSlidesButtons />}
      <NewArrivals />
    </section>
  );
}

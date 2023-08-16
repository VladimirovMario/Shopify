import ImageSlider from './ImageSlider/ImageSlider';
import PromotionSlidesButtons from './PromotionSlidesButtons/PromotionSlidesButtons';
import NewArrivals from './NewArrivals/NewArrivals';

import { useSlidesContext } from '../../../contexts/PromotionSlidesContext';

import styles from './Slider.module.css';

export default function Slider() {
  const { slides, isSelectedSlide } = useSlidesContext();

  return (
    <section className={`${styles['slider-section']} section`}>
      {!isSelectedSlide && <ImageSlider slides={slides} />}
      {isSelectedSlide && <PromotionSlidesButtons />}
      <NewArrivals />
    </section>
  );
}

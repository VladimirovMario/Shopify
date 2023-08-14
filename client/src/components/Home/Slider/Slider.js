import { useEffect, useReducer } from 'react';
import ImageSlider from './ImageSlider/ImageSlider';
import NewArrivals from './NewArrivals/NewArrivals';
import styles from './Slider.module.css';
import { getAllPromoSlides } from '../../../services/promoSliderService';
import promotionSlidesReducer from '../../../reducers/promotionSlidesReducer';

export default function Slider() {
  const [slides, dispatch] = useReducer(promotionSlidesReducer, []);

  useEffect(() => {
    let ignore = false;

    fetchData();
    async function fetchData() {
      if (!ignore) {
        const promotionSlides = await getAllPromoSlides();
        dispatch({
          type: 'INITIAL_SLIDES',
          slides: promotionSlides,
        });
      }
    }

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className={`${styles['slider-section']} section`}>
      <ImageSlider slides={slides} />
      <NewArrivals />
    </section>
  );
}

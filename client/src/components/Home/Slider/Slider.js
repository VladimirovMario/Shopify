import { useEffect, useState } from 'react';
import ImageSlider from './ImageSlider/ImageSlider';
import NewArrivals from './NewArrivals/NewArrivals';
import styles from './Slider.module.css';
import { getAllPromoSlides } from '../../../services/promoSliderService';

export default function Slider() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    let ignore = false;

    fetchData();
    async function fetchData() {
      if (!ignore) {
        const promotionSlides = await getAllPromoSlides();
        setSlides(promotionSlides);
      }
    }

    return () => (ignore = true);
  }, []);

  return (
    <section className={`${styles['slider-section']} section`}>
      <ImageSlider slides={slides} />
      <NewArrivals />
    </section>
  );
}

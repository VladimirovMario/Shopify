import { useGameContext } from '../../../contexts/GameContext';
import { PromotionSlidesProvider } from '../../../contexts/PromotionSlidesContext';
import { Loader } from '../../Shared/Loader/Loader';
import Hero from '../Hero/Hero';
import ProductList from '../ProductList/ProductList';
import Slider from '../Slider/Slider';

export default function HomePage() {
  const { latestGames, loading } = useGameContext();
  return (
    <>
      <PromotionSlidesProvider>
        <Slider />
      </PromotionSlidesProvider>
      <Hero />
      {loading && <Loader />}
      {!loading && <ProductList games={latestGames} />}
    </>
  );
}

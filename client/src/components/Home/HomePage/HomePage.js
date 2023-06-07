import { useGameContext } from "../../../contexts/GameContext";
import { Loader } from "../../Shared/Loader/Loader";
import Hero from "../Hero/Hero";
import ProductList from "../ProductList/ProductList";
import Slider from "../Slider/Slider";

export default function HomePage() {
  const { latestGames, loading } = useGameContext();
  return (
    <>
      <Slider />
      <Hero />
      {loading && <Loader />}
      {!loading && <ProductList games={latestGames} />}
    </>
  );
}

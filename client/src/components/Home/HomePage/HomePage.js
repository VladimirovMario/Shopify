import { useGameContext } from "../../../contexts/GameContext";
import { Loader } from "../../Shared/Loader/Loader";
import Hero from "../Hero/Hero";
import ProductList from "../ProductList/ProductList";

export default function HomePage() {
  const { latestGames, loading } = useGameContext();
  return (
    <>
      <Hero />
      {loading && <Loader/>}
      {!loading && <ProductList games={latestGames} />}
    </>
  );
}

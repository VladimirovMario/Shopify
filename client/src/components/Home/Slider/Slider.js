import ImageSlider from "./ImageSlider/ImageSlider";
import NewArrivals from "./NewArrivals/NewArrivals";
import styles from "./Slider.module.css";

const mockSlides = [
  {
    url: "http://localhost:3000/static/promo-slides/Gaming-Potential.jpg",
    title: "Unleash Gaming Potential",
    desc: "Find Perfect Match with PS4 and PS5 Games",
    isActive: true,
  },
  {
    url: "http://localhost:3000/static/promo-slides/Ignite-Imagination.jpg",
    title: "Books that Ignite Imagination",
    desc: " Discover Captivating Stories for Every Reader",
    isActive: true,
  },
  {
    url: "http://localhost:3000/static/promo-slides/Weekly-Offers.png",
    title: "Weekly Offers",
    desc: "Get Your Hands on the Hottest Titles and Exclusive Deals",
    isActive: true,
  },
  {
    url: "http://localhost:3000/static/promo-slides/Shop-Smarter.jpg",
    title: "Elevate Entertainment Experience",
    desc: "Shop Smarter, Play Harder, and Level Up Your Fun",
    isActive: true,
  },
];

export default function Slider() {
  return (
    <section className={`${styles["slider-section"]} section`}>
     <ImageSlider slides={mockSlides}/>
     <NewArrivals />
    </section>
  );
}

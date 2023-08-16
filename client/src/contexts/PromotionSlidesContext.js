import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { getAllPromoSlides } from '../services/promoSliderService';
import promotionSlidesReducer from '../reducers/promotionSlidesReducer';

const PromotionSlidesContext = createContext(null);

function PromotionSlidesProvider({ children }) {
  const [slides, dispatch] = useReducer(promotionSlidesReducer, []);
  const [wantedSlide, setWantedSlide] = useState({});

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

  function onCurrentIndexClick(index) {
    setWantedSlide(slides[index]);
  }

  function resetSelectedSlide() {
    setWantedSlide({});
  }

  const contextValues = {
    slides,
    wantedSlide,
    isSelectedSlide: !!wantedSlide._id,
    dispatch,
    onCurrentIndexClick,
    resetSelectedSlide,
  };

  return (
    <PromotionSlidesContext.Provider value={contextValues}>
      {children}
    </PromotionSlidesContext.Provider>
  );
}

function useSlidesContext() {
  return useContext(PromotionSlidesContext);
}

export { PromotionSlidesContext, PromotionSlidesProvider, useSlidesContext };

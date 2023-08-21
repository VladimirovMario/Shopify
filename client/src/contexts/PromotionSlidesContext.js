import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import {
  getAllPromoSlides,
  cretePromoSlide,
  editPromoSlide,
  deletePromoSlide,
} from '../services/promoSliderService';
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

  async function onCreateSubmit(promoSlide) {
    const { title, slideDescription, imageUrl, isActive } = promoSlide;

    try {
      const promotionSlide = await cretePromoSlide({
        title,
        slideDescription,
        imageUrl,
        isActive,
      });
      return promotionSlide;
    } catch (error) {
      alert(error.message);
    }
  }

  async function onEditSubmit(promoSlide) {
    const { _id, title, slideDescription, imageUrl, isActive } = promoSlide;
    const id = _id;

    try {
      const promotionSlide = await editPromoSlide(id, {
        title,
        slideDescription,
        imageUrl,
        isActive,
      });
      return promotionSlide;
    } catch (error) {
      alert(error.message);
    }
  }

  async function onDeleteSubmit(promoSlideId) {
    const id = promoSlideId;
    try {
      const deletedSlide = await deletePromoSlide(id);
      return deletedSlide;
    } catch (error) {
      alert(error.message);
    }
  }

  const contextValues = {
    slides,
    wantedSlide,
    isSelectedSlide: !!wantedSlide._id,
    dispatch,
    onCurrentIndexClick,
    resetSelectedSlide,
    onCreateSubmit,
    onEditSubmit,
    onDeleteSubmit,
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

export default function promotionSlidesReducer(slides, action) {
  switch (action.type) {
    case 'INITIAL_SLIDES': {
      return [...action.slides];
    }
    case 'create': {
      const { _id, title, description, imageUrl, isActive } = action.slide;
      return [{ _id, title, description, imageUrl, isActive }, ...slides];
    }
    case 'edit': {
      return slides
        .map((s) => (s._id === action.slide._id ? action.slide : s))
        .filter((s) => s.isActive);
    }
    case 'delete': {
      return slides.filter((slide) => slide._id !== action.slide._id);
    }
    default:
      throw Error(`Unknown action: ${action.type}`);
  }
}

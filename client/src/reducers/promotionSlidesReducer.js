export default function promotionSlidesReducer(slides, action) {
  switch (action.type) {
    case 'INITIAL_SLIDES': {
      return [...action.slides];
    }
    case 'create': {
      const { title, description, imageUrl } = action.slide;
      const id = action.id;
      return [{ id, title, description, imageUrl, isActive: true }, ...slides];
    }
    case 'edit': {
      return slides.map((slide) =>
        slide._id === action.slide._id ? action.slide : slide
      );
    }
    case 'delete': {
      return slides.filter((slide) => slide._id !== action.slide._id);
    }
    default:
      throw Error(`Unknown action: ${action.type}`);
  }
}

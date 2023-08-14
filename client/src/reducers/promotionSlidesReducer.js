export default function promotionSlidesReducer(slides, action) {
  switch (action.type) {
    case 'INITIAL_SLIDES': {
      return [...action.slides];
    }

    default:
      throw Error(`Unknown action: ${action.type}`);
  }
}

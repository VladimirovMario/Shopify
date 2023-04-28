export const textSubstring = (text, field) => {
  const limit = 25;
  const genreLimit = 20;

  if ((field === "title" || field === "description") && text.length >= limit) {
    return `${text.substring(0, limit - 3)}...`;
  } else if (field === "genre" && text.length >= genreLimit) {
    return `${text.substring(0, genreLimit - 3)}...`;
  } else {
    return text;
  }
};

export const formValidations = (e) => {
  const errors = {};
  const target = e.target.name;
  const value = e.target.value;
  const emailRegex =
    /(?<!\S)[A-Za-z]+(\.|-|_)?[A-Za-z]+@[A-Z-a-z]+\.[A-Z-a-z]+(\.[A-Z-a-z]*\.?)?\b/;

  const imageRegex = /^https?:\/\/.+$/i;

  const minLength = 3;
  const middleLength = 60;
  const maxLength = 1400;
  // TODO Add this at the end of message, after fixing the layout: "characters long".
  const message = `should be between ${minLength} and ${middleLength}`;
  const condition = value.length < minLength || value.length > middleLength;

  // User validations
  if (target === "email" && emailRegex.test(value) === false) {
    errors.email = "must be valid address format!";
  }

  if (target === "username" && condition) {
    errors.username = message;
  }

  if (target === "password" && condition) {
    errors.password = message;
  }

  if (target === "repass" && value === "") {
    errors.repass = "don't match with password";
  }

  // Product validations
  if (target === "title" && condition) {
    errors.title = message;
  }

  if (target === "genre" && condition) {
    errors.genre = message;
  }

  if (target === "price" && Number(value) < 0.01) {
    errors.price = "must be a positive number";
  }

  if (target === "imageUrl" && imageRegex.test(value) === false) {
    errors.imageUrl = "should starts with http or https";
  }

  if (target === "description" && (value.length < minLength + 1 || value.length > maxLength)) {
    errors.description = `should be between ${minLength + 1} and ${maxLength} characters long`;
  }

  // Comments validations
  if (target === "subject" && (value.length < minLength + 1 || value.length > middleLength)) {
    errors.subject = `should be between ${minLength + 1} and ${middleLength} characters long`;
  }

  if (target === "content" && (value.length < minLength + 1 || value.length > 600)) {
    errors.content = `should be between ${minLength + 1} and 600 characters long`;
  }

  return errors;
};

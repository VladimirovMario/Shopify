function resetFieldErrors(errors, initialValues) {
  if (Object.is(errors, initialValues)) {
    // Filter out fields with non-empty string
    const nonEmptyFields = Object.entries(errors).filter(
      ([_, value]) => typeof value === 'string' && value !== ''
    );

    if (nonEmptyFields.length > 0) {
      // Returns all fields with non-empty strings
      return nonEmptyFields;
    }
  }
}

export { resetFieldErrors };

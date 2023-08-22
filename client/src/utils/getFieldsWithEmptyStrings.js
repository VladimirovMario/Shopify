export function getFieldsWithEmptyStrings(fields) {
  return Object.entries(fields).filter(
    ([key, value]) =>
      key !== '_id' && typeof value === 'string' && value.trim() === ''
  );
}

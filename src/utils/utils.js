export const capitalize = (word) => {
  if (typeof word !== "string" || !word) return;
  return word[0]?.toUpperCase() + word?.substring(1, word.length);
};

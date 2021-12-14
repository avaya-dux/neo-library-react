export const stringCapper = (text: string, limit: number = 200): string => {
  return text.length > limit ? `${text.substring(0, limit)}...` : text;
};

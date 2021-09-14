export const getAnimationClass = (animation: string) => {
  return animation !== "pulse" ? [""] : ["neo-pulse"];
};

export const getBadgeClass = (badge?: string) => {
  return badge ? ["neo-badge"] : [""];
};

export const getVariantClass = (
  shapeClass: string[],
  variant: string,
  status: string
) => {
  return [`${shapeClass}-${variant}`, `${shapeClass}-${variant}--${status}`];
};

export const getSizeClass = (shapeClass: string[], size: string) => {
  return [`${shapeClass}--${size}`];
};

export const showSpinner = (animation: string) => {
  return animation === "spinner";
};

export const computeBadge = (txt?: string) => {
  // badge limit to 12  as the maximum length of characters
  return txt ? txt.replace(/\s/g, "").substring(0, 12) : "";
};

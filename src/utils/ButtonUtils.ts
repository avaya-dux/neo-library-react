export const rootBtnClass = "neo-btn";

export const getAnimationClass = (animation: string) =>
  animation !== "pulse" ? "" : "neo-pulse";

export const getBadgeClass = (badge?: string) => (badge ? "neo-badge" : "");

export const getVariantClasses = (variant: string, status: string) => [
  `${rootBtnClass}-${variant}`,
  `${rootBtnClass}-${variant}--${status}`,
];

export const getSizeClass = (size: string) => `${rootBtnClass}--${size}`;

export const showSpinner = (animation: string) => animation === "spinner";

export const computeBadge = (txt?: string) => {
  // limit badge string length to 12
  return txt ? txt.replace(/\s/g, "").substring(0, 12) : "";
};

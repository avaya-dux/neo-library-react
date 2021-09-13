export const MultilineClassName = "neo-tooltip__content--multiline";
export const getMultilineClassName = (multiline?: boolean) => {
  switch (multiline) {
    case undefined:
    case true:
      return MultilineClassName;
    case false:
      return undefined;

    default:
      console.error(`Unexpected multiline value encountered: ${multiline}`);
      return MultilineClassName;
  }
};

// TODO-NEO-575: "auto"
export type TooltipPosition =
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";
export const getTooltipPosition = (position: TooltipPosition) => {
  switch (position) {
    case "left":
    case "right":
      return position;
    case "bottom":
      return "down";
    case "top":
      return "up";
    case "top-left":
      return "up-left";
    case "top-right":
      return "up-right";
    case "bottom-left":
      return "down-left";
    case "bottom-right":
      return "down-right";

    default:
      console.error(
        `Unexpected position encountered: ${position}. Defaulting to default "position='bottom'"`
      );
      return "left";
  }
};

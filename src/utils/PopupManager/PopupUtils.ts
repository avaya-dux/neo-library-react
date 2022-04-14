import { PopupPosition } from "./PopupTypes";

export function getAlignStyle(position: PopupPosition): React.CSSProperties {
  const isRighty = position.includes("right");
  const isLefty = position.includes("left");

  let alignItems = "center";
  if (isRighty) alignItems = "flex-end";
  if (isLefty) alignItems = "flex-start";

  return {
    alignItems,
    alignContent: isRighty || isLefty ? undefined : "center",
  };
}

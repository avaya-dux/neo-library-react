import { PopupPosition, PopupOptions, PopupState, PopupId } from "./PopupTypes";

export const findById = (arr: PopupOptions[], id: PopupId) =>
  arr.find((popup) => popup.id === id);

export function findPopup(popups: PopupState["positions"], id: PopupId) {
  const position = getPopupPosition(popups, id);

  const index = position
    ? popups[position].findIndex((popup) => popup.id === id)
    : -1;

  return {
    position,
    index,
  };
}

export const getPopupPosition = (
  popups: PopupState["positions"],
  id: PopupId
) =>
  Object.values(popups)
    .flat()
    .find((popup) => popup.id === id)?.position;

export const isVisible = (popups: PopupState["positions"], id: PopupId) =>
  !!getPopupPosition(popups, id);

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

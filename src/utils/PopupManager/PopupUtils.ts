import { PopupPosition, PopupOptions, PopupState, PopupId } from "./PopupTypes";

/**
 * Given an array of popups for a specific position.
 * It returns the popup that matches the `id` passed
 */
export const findById = (arr: PopupOptions[], id: PopupId) =>
  arr.find((popup) => popup.id === id);

/**
 * Given popups, finds the toast that matches
 * the id and return its position and index
 */
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

/**
 * Given the popups, finds the position of the popup that
 * matches the `id`
 */
export const getPopupPosition = (
  popups: PopupState["positions"],
  id: PopupId
) =>
  Object.values(popups)
    .flat()
    .find((popup) => popup.id === id)?.position;

/**
 * Given the popups, checks if a specific popup is
 * still in the state, which means it is still visible on screen.
 */
export const isVisible = (popups: PopupState["positions"], id: PopupId) =>
  !!getPopupPosition(popups, id);

/**
 * Get's the alignment styles to be applied to a popup's container
 * based on its position in the manager
 */
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

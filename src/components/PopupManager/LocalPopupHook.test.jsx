import { useLocalPopup, localPopupHookLogger } from "./LocalPopupHook";
import { renderHook } from "@testing-library/react-hooks";
import { popupManagerLogger } from "./PopupManager";
popupManagerLogger.disableAll();
localPopupHookLogger.disableAll();
describe("useLocalPopup", () => {
  it("loads ok", () => {
    const { result } = renderHook(() => useLocalPopup());
    expect(result.current.mounted).toBeTruthy();
  });
});

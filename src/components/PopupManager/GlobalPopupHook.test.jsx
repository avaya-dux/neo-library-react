import {
  createContainer,
  createDivWithId,
  useGlobalPopup,
  containerId,
  globalPopupHookLogger,
} from "./GlobalPopupHook";
import { popupManagerLogger } from "./PopupManager";
import { renderHook } from "@testing-library/react-hooks";
popupManagerLogger.disableAll();
globalPopupHookLogger.disableAll();
jest.useFakeTimers();
describe(createContainer, () => {
  it("loads ok", () => {
    const callback = jest.fn();
    createContainer(callback);
    expect(callback).toBeCalledTimes(1);
    callback.mockClear();
    createContainer(callback);
    jest.runAllTimers();
    expect(callback).toBeCalledTimes(1);
  });
});
describe(createDivWithId, () => {
  it("creation successful", () => {
    const id = "id";
    createDivWithId(id);
    expect(document.getElementById(id)).toBeTruthy();
  });
});
describe(useGlobalPopup, () => {
  it("mounted ok", async () => {
    expect(document.getElementById(containerId)).toBeDefined();
    const { result } = renderHook(() => useGlobalPopup());
    // jest.runAllTimers();

    expect(result.current.mounted).toBeTruthy();
  });
});

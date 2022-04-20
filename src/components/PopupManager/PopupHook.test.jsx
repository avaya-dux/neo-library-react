import {
  createContainer,
  createDivWithId,
  usePopup,
  containerId,
  popupHookLogger,
} from "./PopupHook";
import { popupManagerLogger } from "./PopupManager";
import { renderHook } from "@testing-library/react-hooks";
popupManagerLogger.disableAll();
popupHookLogger.disableAll();
describe(createContainer, () => {
  it("loads ok", () => {
    jest.useFakeTimers();
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
describe(usePopup, () => {
  it("mounted ok", async () => {
    expect(document.getElementById(containerId)).toBeDefined();
    const { result } = renderHook(() => usePopup());
    expect(result.current.mounted).toBeTruthy();
  });
});

import {
  createContainer,
  createDivWithId,
  usePopup,
  containerId,
  popupHookLogger,
  toastInit,
  notifyInit,
  removeInit,
  removeAllInit,
  removePopupManagerContainer,
} from "./PopupHook";
import { popupManagerLogger } from "./PopupManager";
import { renderHook } from "@testing-library/react-hooks";
import { Notification } from "components/Notification";
popupManagerLogger.disableAll();
popupHookLogger.disableAll();
describe("PopupHook", () => {
  afterEach(() => {
    document.getElementsByTagName("html")[0].innerHTML = "";
  });
  it("createContainer creates container", () => {
    jest.useFakeTimers();
    const callback = jest.fn();
    createContainer(callback);
    expect(callback).toBeCalledTimes(1);
    callback.mockClear();
    createContainer(callback);
    jest.runAllTimers();
    expect(callback).toBeCalledTimes(1);
  });

  it("createDivWithId creation successful", () => {
    const id = "id";
    createDivWithId(id);
    expect(document.getElementById(id)).toBeTruthy();
  });

  it("usePopup creates container ok", async () => {
    expect(document.getElementById(containerId)).toBeNull();
    const { result } = renderHook(() => usePopup());
    expect(result.current.mounted).toBeTruthy();
    expect(document.getElementById(containerId)).toBeInTheDocument();
  });
  it("notify ok", async () => {
    const { result } = renderHook(() => usePopup());
    expect(result.current.notify).toBeTruthy();
    const notification = (
      <Notification
        type="event"
        icon="copy"
        header="Event"
        description="This is an event."
        action={{ count: "00:00" }}
      />
    );
    const { id, position } = result.current.notify({ node: notification });
    expect(position).toEqual("top");
    expect(id).toBe(1);
  });
  it("toastInit ok", () => {
    const mock = jest.fn();
    jest.spyOn(popupHookLogger, "error").mockImplementation(mock);
    const { id, position } = toastInit();
    expect(mock).toBeCalled();
    expect(id).toEqual(-1);
    expect(position).toEqual("top");
  });
  it("notifyInit ok", () => {
    const mock = jest.fn();
    jest.spyOn(popupHookLogger, "error").mockImplementation(mock);
    const { id, position } = notifyInit();
    expect(mock).toBeCalled();
    expect(id).toEqual(-1);
    expect(position).toEqual("top");
  });
  it("removeInit ok", () => {
    const mock = jest.fn();
    jest.spyOn(popupHookLogger, "error").mockImplementation(mock);
    removeInit();
    expect(mock).toBeCalled();
  });
  it("removeAllInit ok", () => {
    const mock = jest.fn();
    jest.spyOn(popupHookLogger, "error").mockImplementation(mock);
    removeAllInit();
    expect(mock).toBeCalled();
  });
  it("removePopupManagerContainer works when container does not exists.", () => {
    expect(document.getElementById(containerId)).toBeNull();
    removePopupManagerContainer();
  });
});

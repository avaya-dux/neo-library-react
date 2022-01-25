import { handleMouseClickEvent } from "./MouseEventHandlers";

describe("Tab Mouse event handlers", () => {
  describe(handleMouseClickEvent, () => {
    let setActiveTabId;
    let setActivePanelId;
    beforeEach(() => {
      setActiveTabId = jest.fn();
      setActivePanelId = jest.fn();
    });
    it("should call setActiveTabId when tab is clicked.", () => {
      const target = { getAttribute: () => "tab1" };
      const e = {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
        target,
      };

      handleMouseClickEvent(e, setActiveTabId, setActivePanelId);
      expect(e.stopPropagation).toBeCalled();
      expect(setActiveTabId).toBeCalledWith("tab1");
      expect(setActivePanelId).toBeCalledWith("tab1");
      expect(e.preventDefault).toBeCalled();
    });
    it("should not call setActiveTabId if id is null", () => {
      const target = { getAttribute: () => null };
      const e = {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
        target,
      };
      handleMouseClickEvent(e, setActiveTabId, setActivePanelId);
      expect(e.stopPropagation).toBeCalled();
      expect(setActiveTabId).not.toBeCalled();
      expect(setActivePanelId).not.toBeCalled();
      expect(e.preventDefault).toBeCalled();
    });
  });
});

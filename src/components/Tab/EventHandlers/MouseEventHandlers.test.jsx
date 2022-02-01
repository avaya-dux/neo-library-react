import { handleMouseClickEvent } from "./MouseEventHandlers";

describe("Tab Mouse event handlers", () => {
  describe(handleMouseClickEvent, () => {
    let setActiveTabIndex;
    let setActivePanelIndex;
    let tabs;
    beforeEach(() => {
      tabs = getTabProps();
      setActiveTabIndex = jest.fn();
      setActivePanelIndex = jest.fn();
    });
    it("should call setActiveTabIndex when tab is clicked.", () => {
      const target = { getAttribute: () => "tab1" };
      const e = {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
        target,
      };

      handleMouseClickEvent(e, tabs, setActiveTabIndex, setActivePanelIndex);
      expect(e.stopPropagation).toBeCalled();
      expect(setActiveTabIndex).toBeCalledWith(0);
      expect(setActivePanelIndex).toBeCalledWith(0);
      expect(e.preventDefault).toBeCalled();
    });
    it("should not call setActiveTabIndex if id is null", () => {
      const target = { getAttribute: () => null };
      const e = {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
        target,
      };
      handleMouseClickEvent(e, tabs, setActiveTabIndex, setActivePanelIndex);
      expect(e.stopPropagation).toBeCalled();
      expect(setActiveTabIndex).not.toBeCalled();
      expect(setActivePanelIndex).not.toBeCalled();
      expect(e.preventDefault).toBeCalled();
    });
  });
});

function getTabProps() {
  return [
    {
      content: <h2>content1</h2>,
      disabled: false,
      id: "tab1",
      name: "tab1",
    },
    {
      content: "content 2",
      disabled: false,
      id: "tab2",
      name: "tab2",
    },
    {
      content: "content 3",
      disabled: false,
      id: "tab3",
      name: "tab3",
    },
  ];
}

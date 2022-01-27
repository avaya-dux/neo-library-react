import { handleBlurEvent, handleKeyDownEvent } from "./KeyboardEventHandlers";
import { Keys } from "utils";

describe("Tab Keyboard event handlers", () => {
  describe(handleKeyDownEvent, () => {
    let setActiveTabIndex, setActivePanelIndex, ref;

    beforeEach(() => {
      setActiveTabIndex = jest.fn();
      setActivePanelIndex = jest.fn();
      ref = { current: { focus: jest.fn(), blur: jest.fn() } };
    });

    describe(Keys.DOWN, () => {
      let e;
      beforeEach(() => {
        e = { key: Keys.DOWN, stopPropagation: jest.fn() };
      });
      it("should do nothing when tabs is empty", () => {
        const tabs = [];
        handleKeyDownEvent(
          e,
          false,
          tabs,
          0,
          setActiveTabIndex,
          setActivePanelIndex,
          ref
        );
        expect(setActiveTabIndex).not.toBeCalled();
        expect(setActivePanelIndex).not.toBeCalled();
      });
      it("should do nothing if tab is horizontal.", () => {
        const tabs = getTabProps();
        handleKeyDownEvent(
          e,
          false,
          tabs,
          0,
          setActiveTabIndex,
          setActivePanelIndex,
          ref
        );
        expect(setActiveTabIndex).not.toBeCalled();
        expect(setActivePanelIndex).not.toBeCalled();
      });
      it("should go to next tab if tab is vertical", () => {
        const tabs = getTabProps();
        handleKeyDownEvent(
          e,
          true,
          tabs,
          0,
          setActiveTabIndex,
          setActivePanelIndex,
          ref
        );
        expect(setActiveTabIndex).toBeCalledWith(1);
        expect(setActivePanelIndex).not.toBeCalled();
      });
    });
    describe(Keys.UP, () => {
      let e;
      beforeEach(() => {
        e = {
          key: Keys.UP,
          stopPropagation: jest.fn(),
          preventDefault: jest.fn(),
        };
      });
      it("should do nothing with horizontal tab layout.", () => {});
    });
    describe(Keys.ENTER, () => {
      let e;
      beforeEach(() => {
        e = {
          key: Keys.ENTER,
          stopPropagation: jest.fn(),
          preventDefault: jest.fn(),
        };
      });
      it("should do nothing if tab is vertical", () => {
        testEnterOrSpaceKeyDown(e, setActiveTabIndex, setActivePanelIndex, ref);
      });
    });
    describe(Keys.SPACE, () => {
      let e;
      beforeEach(() => {
        e = {
          key: Keys.SPACE,
          stopPropagation: jest.fn(),
          preventDefault: jest.fn(),
        };
      });
      it("should call setActivePanelIndex and focus", () => {
        testEnterOrSpaceKeyDown(e, setActiveTabIndex, setActivePanelIndex, ref);
      });
    });
    describe(Keys.RIGHT, () => {
      let e;
      beforeEach(() => {
        e = {
          key: Keys.RIGHT,
          stopPropagation: jest.fn(),
          preventDefault: jest.fn(),
        };
      });
      it("should move to tab3 from tab2 with horizontal tab", () => {
        const tabs = getTabProps();
        handleKeyDownEvent(
          e,
          false,
          tabs,
          1,
          setActiveTabIndex,
          setActivePanelIndex,
          ref
        );
        expect(e.stopPropagation).toHaveBeenCalled();
        expect(setActiveTabIndex).toBeCalledWith(2);
      });
    });
    describe(Keys.LEFT, () => {
      let e;
      beforeEach(() => {
        e = {
          key: Keys.LEFT,
          stopPropagation: jest.fn(),
        };
      });
      it("should move to tab1 from tab2 with horizontal tabs", () => {
        const tabs = getTabProps();
        handleKeyDownEvent(
          e,
          false,
          tabs,
          1,
          setActiveTabIndex,
          setActivePanelIndex,
          ref
        );
        expect(e.stopPropagation).toHaveBeenCalled();
        expect(setActiveTabIndex).toBeCalledWith(0);
      });
    });
  });
  describe(handleBlurEvent, () => {
    let ref;
    beforeEach(() => {
      ref = { current: { blur: jest.fn() } };
    });
    it("blur is called", () => {
      const target = { getAttribute: () => "tab1" };
      const e = { target, relatedTarget: null };
      handleBlurEvent(e, ref);
      expect(ref.current.blur).toHaveBeenCalled();
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

function testEnterOrSpaceKeyDown(e, setActiveTabIndex, setActivePanelIndex, ref) {
  const tabs = getTabProps();
  handleKeyDownEvent(e, false, tabs, 1, setActiveTabIndex, setActivePanelIndex, ref);
  expect(setActivePanelIndex).toBeCalledWith(1);
  expect(e.stopPropagation).toHaveBeenCalled();
  expect(e.preventDefault).toHaveBeenCalled();
}

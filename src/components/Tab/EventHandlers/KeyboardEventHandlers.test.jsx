import {
  handleBlurEvent,
  handleKeyDownEvent,
  handleFocusEvent,
  handleCloseElementKeyDownEvent,
} from "./KeyboardEventHandlers";
import { Keys } from "utils";
import { activatePreviousTab, getNextTabIndex } from "./KeyboardHelper";
import { activateAnotherTabAndPanel } from "./Helper";
jest.mock("./KeyboardHelper");
jest.mock("./Helper");
describe("Tab Keyboard event handlers", () => {
  describe(handleFocusEvent, () => {
    let ref;
    beforeEach(() => {
      ref = {
        current: {
          blur: jest.fn(),
        },
      };
    });
    it("when a disabled tab received focus event, it should be blurred.", () => {
      const target = {
        getAttribute: jest
          .fn()
          .mockReturnValueOnce("tab1")
          .mockReturnValueOnce("true"),
      };
      const e = {
        target,
        relatedTarget: null,
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
      };
      handleFocusEvent(e, ref);
      expect(ref.current.blur).toHaveBeenCalled();
      expect(e.stopPropagation).toBeCalled();
      expect(e.preventDefault).toBeCalled();
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
      afterEach(() => {
        jest.resetAllMocks();
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
      it("should activate next tab if next tab exists and tab layout is vertical", () => {
        const tabs = getTabProps();
        getNextTabIndex.mockReturnValue(1);
        handleKeyDownEvent(
          e,
          true,
          tabs,
          0,
          setActiveTabIndex,
          setActivePanelIndex,
          ref
        );
        expect(setActiveTabIndex).toBeCalled();
      });
      it("should do nothing if next tab does not exist  and tab layout is vertical", () => {
        const tabs = getTabProps();
        getNextTabIndex.mockReturnValue(2);
        handleKeyDownEvent(
          e,
          true,
          tabs,
          2,
          setActiveTabIndex,
          setActivePanelIndex,
          ref
        );
        expect(setActiveTabIndex).not.toBeCalled();
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
      it("should activate previous tab with vertical tab layout.", () => {
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
        expect(activatePreviousTab).toBeCalled();
      });
      it("should do nothing with horizontal tab layout.", () => {
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
        expect(activatePreviousTab).not.toBeCalled();
      });
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
      it("should do nothing with vertical tabs", () => {
        const tabs = getTabProps();
        getNextTabIndex.mockReturnValue(2);
        handleKeyDownEvent(
          e,
          true,
          tabs,
          1,
          setActiveTabIndex,
          setActivePanelIndex,
          ref
        );
        expect(e.stopPropagation).toHaveBeenCalled();
        expect(getNextTabIndex).not.toBeCalled();
      });
      it("should move to tab3 from tab2 with horizontal tabs", () => {
        const tabs = getTabProps();
        getNextTabIndex.mockReturnValue(2);
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
      it("should do nothing with vertical tabs", () => {
        const tabs = getTabProps();
        handleKeyDownEvent(
          e,
          true,
          tabs,
          1,
          setActiveTabIndex,
          setActivePanelIndex,
          ref
        );
        expect(e.stopPropagation).toHaveBeenCalled();
        expect(activatePreviousTab).not.toBeCalled();
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
        expect(activatePreviousTab).toBeCalled();
      });
    });
  });
  describe(handleCloseElementKeyDownEvent, () => {
    let setActiveTabIndex, setActivePanelIndex, ref;

    beforeEach(() => {
      setActiveTabIndex = jest.fn();
      setActivePanelIndex = jest.fn();
      ref = { current: { focus: jest.fn(), blur: jest.fn() } };
    });

    it("should do nothing if tabs is empty", () => {
      handleCloseElementKeyDownEvent(
        { key: Keys.DOWN },
        [],
        0,
        setActiveTabIndex,
        setActivePanelIndex,
        ref
      );
      expect(setActiveTabIndex).not.toBeCalled();
      expect(setActivePanelIndex).not.toBeCalled();
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
      it("should call activateAnotherTabAndPanel", () => {
        testCloseElementKeyDown(e, setActiveTabIndex, setActivePanelIndex, ref);
      });
    });
    describe("SPACE", () => {
      let e;
      beforeEach(() => {
        e = {
          key: Keys.SPACE,
          stopPropagation: jest.fn(),
          preventDefault: jest.fn(),
        };
      });
      it("should call activateAnotherTabAndPanel", () => {
        testCloseElementKeyDown(e, setActiveTabIndex, setActivePanelIndex, ref);
      });
    });
    describe("TAB", () => {
      it("Tab moves focus from close button to next available tab", () => {
        getNextTabIndex.mockReturnValue(1);
        const e = {
          key: Keys.TAB,
          shiftKey: false,
          stopPropagation: jest.fn(),
          preventDefault: jest.fn(),
        };
        handleCloseElementKeyDownEvent(
          e,
          [{ name: "tab1" }, { name: "tab2" }],
          0,
          setActiveTabIndex,
          setActivePanelIndex,
          ref
        );
        expect(setActiveTabIndex).toBeCalledWith(1);
        expect(setActivePanelIndex).not.toBeCalled();
        expect(ref.current.focus).not.toBeCalled();
      });
      it("Tab moves focus from close button to current tab if no next tab", () => {
        getNextTabIndex.mockReturnValue(0);
        const e = {
          key: Keys.TAB,
          shiftKey: false,
          stopPropagation: jest.fn(),
          preventDefault: jest.fn(),
        };
        handleCloseElementKeyDownEvent(
          e,
          [{ name: "tab1" }],
          0,
          setActiveTabIndex,
          setActivePanelIndex,
          ref
        );
        expect(setActiveTabIndex).not.toBeCalled();
        expect(setActivePanelIndex).not.toBeCalled();
        expect(ref.current.focus).toBeCalled();
      });
      it("Shfit+Tab moves focus from close button to current tab", () => {
        getNextTabIndex.mockReturnValue(0);
        const e = {
          key: Keys.TAB,
          shiftKey: true,
          stopPropagation: jest.fn(),
          preventDefault: jest.fn(),
        };
        handleCloseElementKeyDownEvent(
          e,
          [{ name: "tab1" }],
          0,
          setActiveTabIndex,
          setActivePanelIndex,
          ref
        );
        expect(setActiveTabIndex).not.toBeCalled();
        expect(setActivePanelIndex).not.toBeCalled();
        expect(ref.current.focus).toBeCalled();
      });
    });
    describe("Other Key", () => {
      it("should return false", () => {
        expect(
          handleCloseElementKeyDownEvent(
            { key: Keys.DOWN },
            getTabProps(),
            0,
            setActiveTabIndex,
            setActivePanelIndex,
            ref
          )
        ).toBeFalsy();
        expect(setActiveTabIndex).not.toBeCalled();
        expect(setActivePanelIndex).not.toBeCalled();
      });
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
function testCloseElementKeyDown(e, setActiveTabIndex, setActivePanelIndex) {
  expect(
    handleCloseElementKeyDownEvent(
      e,
      [{ name: "tab1" }],
      0,
      setActiveTabIndex,
      setActivePanelIndex
    )
  ).toBeTruthy();
  expect(activateAnotherTabAndPanel).toBeCalled();
  expect(e.preventDefault).toBeCalled();
  expect(e.stopPropagation).toBeCalled();
}
function testEnterOrSpaceKeyDown(
  e,
  setActiveTabIndex,
  setActivePanelIndex,
  ref
) {
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
  expect(setActivePanelIndex).toBeCalledWith(1);
  expect(e.stopPropagation).toHaveBeenCalled();
  expect(e.preventDefault).toHaveBeenCalled();
}

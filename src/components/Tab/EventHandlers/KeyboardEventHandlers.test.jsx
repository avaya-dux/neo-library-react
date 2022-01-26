import { handleBlurEvent, handleKeyDownEvent } from "./KeyboardEventHandlers";
import { Keys } from "utils";

describe("Tab Keyboard event handlers", () => {
  describe(handleKeyDownEvent, () => {
    let setActiveTabId, setActivePanelId, ref;

    beforeEach(() => {
      setActiveTabId = jest.fn();
      setActivePanelId = jest.fn();
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
          "tab1",
          setActiveTabId,
          setActivePanelId,
          ref
        );
        expect(setActiveTabId).not.toBeCalled();
        expect(setActivePanelId).not.toBeCalled();
      });
      it("should do nothing if tab is horizontal.", () => {
        const tabs = getTabProps();
        handleKeyDownEvent(
          e,
          false,
          tabs,
          "tab1",
          setActiveTabId,
          setActivePanelId,
          ref
        );
        expect(setActiveTabId).not.toBeCalled();
        expect(setActivePanelId).not.toBeCalled();
      });
      it("should go to next tab if tab is vertical", () => {
        const tabs = getTabProps();
        handleKeyDownEvent(
          e,
          true,
          tabs,
          "tab1",
          setActiveTabId,
          setActivePanelId,
          ref
        );
        expect(setActiveTabId).toBeCalledWith("tab2");
        expect(setActivePanelId).not.toBeCalled();
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
        testEnterOrSpaceKeyDown(e, setActiveTabId, setActivePanelId, ref);
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
      it("should call setActivePanelId and focus", () => {
        testEnterOrSpaceKeyDown(e, setActiveTabId, setActivePanelId, ref);
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
          "tab2",
          setActiveTabId,
          setActivePanelId,
          ref
        );
        expect(e.stopPropagation).toHaveBeenCalled();
        expect(setActiveTabId).toBeCalledWith("tab3");
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
          "tab2",
          setActiveTabId,
          setActivePanelId,
          ref
        );
        expect(e.stopPropagation).toHaveBeenCalled();
        expect(setActiveTabId).toBeCalledWith("tab1");
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

function testEnterOrSpaceKeyDown(e, setActiveTabId, setActivePanelId, ref) {
  const tabs = getTabProps();
  handleKeyDownEvent(
    e,
    false,
    tabs,
    "tab2",
    setActiveTabId,
    setActivePanelId,
    ref
  );
  expect(setActivePanelId).toBeCalledWith("tab2");
  expect(e.stopPropagation).toHaveBeenCalled();
  expect(e.preventDefault).toHaveBeenCalled();
}

import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import log from "loglevel";

import { getClassNames } from "./Menu";
import * as MenuStories from "./Menu.stories";

const menuLogger = log.getLogger("menu");
menuLogger.disableAll();
const subMenuLogger = log.getLogger("submenu");
subMenuLogger.disableAll();
const keyboardLogger = log.getLogger("menu-keyboard-event-handler");
keyboardLogger.disableAll();
const mouseLogger = log.getLogger("menu-mouse-event-handler");
mouseLogger.disableAll();

const {
  SimpleMenu,
  SimpleMenuTemplated,
  SimpleMenuRightAlignedTemplated,
  FunctionalMenu,
  MenuSeperator,
  MultiLevelSubMenu,
  TwoMenus,
} = composeStories(MenuStories);
describe("Menu", () => {
  describe("Base tests", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<MultiLevelSubMenu />);
    });

    it("menu can be opened and closed via keyboard functionality", () => {
      const { getByRole } = renderResult;
      const button = getByRole("button");

      // menu is hidden before tabbing to menu button and pressing key "space"
      expect(getByRole("group")).not.toBeNull();
      expect(button).not.toBeNull();
      expect(() => getByRole("menu")).toThrow();

      // tab to menu button, press spacebar, and menu is visible
      userEvent.tab();
      expect(button).toHaveFocus();
      userEvent.keyboard("{space}");
      expect(() => getByRole("menu")).not.toThrow();

      // press esc should hide menu
      userEvent.keyboard("{esc}");
      expect(() => getByRole("menu")).toThrow();
    });

    it("menu can be opened and closed via mouse functionality", () => {
      const { getByRole } = renderResult;
      const button = getByRole("button");

      // menu is hidden before clicking menu button
      expect(getByRole("group")).not.toBeNull();
      expect(button).not.toBeNull();
      expect(() => getByRole("menu")).toThrow();

      // tab to menu button, press spacebar, and menu is visible
      userEvent.tab();
      expect(button).toHaveFocus();
      userEvent.click(button);
      expect(() => getByRole("menu")).not.toThrow();

      // click again to hide menu
      userEvent.click(button);
      expect(() => getByRole("menu")).toThrow();
    });

    it("menu can be navigated via keyboard functionality.", () => {
      const { getByRole, queryAllByRole } = renderResult;
      const button = getByRole("button");
      expect(() => getByRole("menu")).toThrow();

      userEvent.tab();
      expect(button).toHaveFocus();

      // button arrowdown will open menu and move focus to first menu item
      userEvent.keyboard("{ArrowDown}");
      expect(() => getByRole("menu")).not.toThrow();
      const menuItems = queryAllByRole("menuitem");
      expect(menuItems[0]).toHaveAttribute("tabindex", "0");
      expect(menuItems[1]).toHaveAttribute("tabindex", "-1");
      expect(menuItems[2]).toHaveAttribute("tabindex", "-1");

      // arrowdown again to navigate to next menu item
      userEvent.keyboard("{ArrowDown}");
      expect(menuItems[0]).toHaveAttribute("tabindex", "-1");
      expect(menuItems[1]).toHaveAttribute("tabindex", "0");
      expect(menuItems[2]).toHaveAttribute("tabindex", "-1");
    });
  });

  describe(getClassNames, () => {
    it("should return correct classes when isOpen = false and itemAlignment = false", () => {
      expect(getClassNames(false, "left")).toMatchInlineSnapshot(
        `"neo-dropdown neo-dropdown--right"`
      );
    });

    it("should return correct classes when isOpen = false and itemAlignment = true", () => {
      expect(getClassNames(false, "right")).toMatchInlineSnapshot(
        `"neo-dropdown neo-dropdown--left"`
      );
    });

    it("should return correct classes when isOpen = true and itemAlignment = false", () => {
      expect(getClassNames(true, "left")).toMatchInlineSnapshot(
        `"neo-dropdown neo-dropdown--right neo-dropdown--active"`
      );
    });

    it("should return correct classes when isOpen = true and itemAlignment = true", () => {
      expect(getClassNames(true, "right")).toMatchInlineSnapshot(
        `"neo-dropdown neo-dropdown--left neo-dropdown--active"`
      );
    });

    it("should return correct classes when className is passed", () => {
      expect(getClassNames(true, "right", "extraclass")).toMatchInlineSnapshot(
        `"neo-dropdown neo-dropdown--left neo-dropdown--active extraclass"`
      );
    });
  });

  describe("Storybook tests", () => {
    describe("SimpleMenu", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<SimpleMenu />);
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("SimpleMenuTemplated", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<SimpleMenuTemplated />);
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("SimpleMenuRightAlignedTemplated", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<SimpleMenuRightAlignedTemplated />);
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("FunctionalMenu", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<FunctionalMenu />);
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("MenuSeperator", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<MenuSeperator />);
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("MultiLevelSubMenu", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<MultiLevelSubMenu />);
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("TwoMenus", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<TwoMenus />);
      });

      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
  });
});

import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
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
  OnlySeparator,
  SimpleMenu,
  OneLevelSubMenu,
  TwoLevelSubMenu,
  ThreeLevelSubMenu,
  OneLevelSubMenuRight,
  TwoMenus,
} = composeStories(MenuStories);

describe("Storybook tests", () => {
  describe("OnlySeparator", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<OnlySeparator />);
    });
    it("should render ok", () => {
      const { container } = renderResult;
      expect(container).toBeDefined();
    });

    it("passes basic axe compliance", async () => {
      const { container } = renderResult;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("press space on button to open the menu", async () => {
      const { getByRole, queryByTestId } = renderResult;
      const dataTestId = "separator-id";
      // menu is hidden before pressing key "space"
      expect(queryByTestId(dataTestId)).toBeNull();
      const button = getByRole("button");
      expect(button).toHaveFocus();
      userEvent.keyboard("{space}");
      const separator = await screen.getByTestId(dataTestId);
      expect(separator).toBeDefined();
      // press esc should hide menu
      userEvent.keyboard("{esc}");
      const menu = await screen.queryByRole("menu");
      expect(menu).toBeNull();
    });

    it("click button to open the menu", async () => {
      const { getByRole, queryByTestId } = renderResult;
      const dataTestId = "separator-id";
      // menu is hidden before pressing key "space"
      expect(queryByTestId(dataTestId)).toBeNull();
      const button = getByRole("button");
      expect(button).toHaveFocus();
      userEvent.click(button);
      const separator = await screen.getByTestId(dataTestId);
      expect(separator).toBeDefined();
      // click again to hide menu
      userEvent.click(button);
      const menu = await screen.queryByRole("menu");
      expect(menu).toBeNull();
    });
  });

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

  describe("OneLevelSubMenu", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<OneLevelSubMenu />);
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

    it("press arrow down on button should move focus to first menu item.", async () => {
      const { getByRole } = renderResult;
      const button = getByRole("button");
      expect(button).toHaveFocus();
      // button arrowdown will open menu and move focus to first menu item
      userEvent.keyboard("{ArrowDown}");
      const menuItems = await screen.queryAllByRole("menuitem");
      expect(menuItems[0]).toHaveAttribute("tabindex", "0");
      expect(menuItems[1]).toHaveAttribute("tabindex", "-1");
      expect(menuItems[2]).toHaveAttribute("tabindex", "-1");
    });
    it("press arrow down twice should move focus to first menu item.", async () => {
      const { getByRole } = renderResult;
      const button = getByRole("button");
      expect(button).toHaveFocus();
      // first arrowdown will open menu and move focus to first menu item
      // second arrowdown will move focus to second menuitem.
      userEvent.keyboard("{ArrowDown}{ArrowDown}");
      const menuItems = await screen.queryAllByRole("menuitem");
      expect(menuItems[0]).toHaveAttribute("tabindex", "-1");
      expect(menuItems[1]).toHaveAttribute("tabindex", "0");
      expect(menuItems[2]).toHaveAttribute("tabindex", "-1");
    });
    it("press arrow down on button should move focus to first menu item.", async () => {
      const { getByRole } = renderResult;
      const button = getByRole("button");
      expect(button).toHaveFocus();
      // button arrowdown will open menu and move focus to first menu item
      userEvent.keyboard("{ArrowDown}");
      const menuItems = await screen.queryAllByRole("menuitem");
      expect(menuItems[0]).toHaveAttribute("tabindex", "0");
      expect(menuItems[1]).toHaveAttribute("tabindex", "-1");
      expect(menuItems[2]).toHaveAttribute("tabindex", "-1");
      // hover over submenu to open it
      const subMenu = screen.getByText(/SubMenu/i);
      userEvent.hover(subMenu);
      userEvent.hover(subMenu);

      const moreMenuItems = await screen.queryAllByRole("menu");
      expect(moreMenuItems.length).toBe(2);
    });
  });

  describe("TwoLevelSubMenu", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<TwoLevelSubMenu />);
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

  describe("ThreeLevelSubMenu", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<ThreeLevelSubMenu />);
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

  describe("OneLevelSubMenuRight", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<OneLevelSubMenuRight />);
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

describe(getClassNames, () => {
  it("should return correct classes when isOpen = false and rightAlign = false", () => {
    expect(getClassNames(false, false)).toMatchInlineSnapshot(
      `"neo-dropdown neo-dropdown--right"`
    );
  });
  it("should return correct classes when isOpen = false and rightAlign = true", () => {
    expect(getClassNames(false, true)).toMatchInlineSnapshot(
      `"neo-dropdown neo-dropdown--left"`
    );
  });
  it("should return correct classes when isOpen = true and rightAlign = false", () => {
    expect(getClassNames(true, false)).toMatchInlineSnapshot(
      `"neo-dropdown neo-dropdown--right neo-dropdown--active"`
    );
  });
  it("should return correct classes when isOpen = true and rightAlign = true", () => {
    expect(getClassNames(true, true)).toMatchInlineSnapshot(
      `"neo-dropdown neo-dropdown--left neo-dropdown--active"`
    );
  });
});

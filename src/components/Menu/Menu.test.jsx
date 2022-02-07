import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import log from "loglevel";

import { Menu, MenuButton, MenuItem } from "./";
import { addIdToChildren, buildMenuIndexes, layoutChildren } from "./helpers";
import { getClassNames } from "./Menu";
import * as MenuStories from "./Menu.stories";
import { MenuSeparator } from "./MenuSeparator";
import { SubMenu } from "./SubMenu";

const menuLogger = log.getLogger("menu");
menuLogger.disableAll();
const subMenuLogger = log.getLogger("submenu");
subMenuLogger.disableAll();
const keyboardLogger = log.getLogger("menu-keyboard-event-handler");
keyboardLogger.disableAll();
const mouseLogger = log.getLogger("menu-mouse-event-handler");
mouseLogger.disableAll();
const menuHelpersLogger = log.getLogger("menu-helpers");
menuHelpersLogger.disableAll();

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
    it("retains passed `onMenuClose` functionality", () => {
      const onMenuCloseSpy = jest.fn();
      const { getByRole } = render(
        <Menu
          defaultIsOpen // not ideal
          onMenuClose={onMenuCloseSpy}
          menuRootElement={<MenuButton>button</MenuButton>}
        >
          <MenuItem>placeholder one</MenuItem>
          <MenuItem>placeholder two</MenuItem>
        </Menu>
      );

      const button = getByRole("button");

      userEvent.click(button);
      expect(onMenuCloseSpy).not.toHaveBeenCalled();

      userEvent.keyboard("{esc}");
      expect(onMenuCloseSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("keyboard and mouse tests", () => {
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

  describe("MenuButton retains any passed functionality", () => {
    const onClickSpy = jest.fn();
    const onKeyDownSpy = jest.fn();
    const onMouseEnterSpy = jest.fn();
    let renderResult;

    beforeEach(() => {
      renderResult = render(
        <Menu
          menuRootElement={
            <MenuButton
              onClick={onClickSpy}
              onKeyDown={onKeyDownSpy}
              onMouseEnter={onMouseEnterSpy}
            >
              button
            </MenuButton>
          }
        >
          <MenuItem>one</MenuItem>
          <MenuItem>two</MenuItem>
          <MenuItem>three</MenuItem>
        </Menu>
      );
    });

    it("retains passed `onClick` functionality", () => {
      onClickSpy.mockClear();
      expect(onClickSpy).not.toHaveBeenCalled();

      const { getByRole } = renderResult;
      const button = getByRole("button");

      expect(onClickSpy).not.toHaveBeenCalled();
      userEvent.click(button);
      expect(onClickSpy).toHaveBeenCalled();
    });

    it("retains passed `onKeyDown` functionality", () => {
      onKeyDownSpy.mockClear();
      expect(onKeyDownSpy).not.toHaveBeenCalled();

      const { getByRole } = renderResult;
      const button = getByRole("button");

      userEvent.tab();
      expect(button).toHaveFocus();

      expect(onKeyDownSpy).not.toHaveBeenCalled();
      userEvent.keyboard("{space}");
      expect(onKeyDownSpy).toHaveBeenCalled();
    });

    it("retains passed `onMouseEnter` functionality", () => {
      onMouseEnterSpy.mockClear();
      expect(onMouseEnterSpy).not.toHaveBeenCalled();

      const { getByRole } = renderResult;
      const button = getByRole("button");

      expect(onMouseEnterSpy).not.toHaveBeenCalled();
      userEvent.hover(button);
      expect(onMouseEnterSpy).toHaveBeenCalled();
    });
  });

  describe("MenuButton respects the prop `openOnHover`", () => {
    const activeClassName = "neo-dropdown--active";
    const onHoverClassName = "neo-dropdown--onhover";

    it("if `openOnHover` is set to `true`, menu shows when root element is hovered", () => {
      const { getByRole } = render(
        <SimpleMenuTemplated defaultIsOpen={false} openOnHover />
      );
      const menuRoot = getByRole("group");
      const menuButton = getByRole("button");

      expect(menuRoot).not.toHaveClass(activeClassName);
      expect(menuRoot).toHaveClass(onHoverClassName);
      userEvent.hover(menuButton);
      expect(menuRoot).toHaveClass(activeClassName);
    });

    it("if `openOnHover` is set to `false`, menu is not shown when root element is hovered", () => {
      const { getByRole } = render(
        <SimpleMenuTemplated defaultIsOpen={false} openOnHover={false} />
      );
      const menuRoot = getByRole("group");
      const menuButton = getByRole("button");

      expect(menuRoot).not.toHaveClass(activeClassName);
      expect(menuRoot).not.toHaveClass(onHoverClassName);
      userEvent.hover(menuButton);
      expect(menuRoot).not.toHaveClass(activeClassName);
      expect(menuRoot).not.toHaveClass(onHoverClassName);
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

  describe("helper methods", () => {
    describe(addIdToChildren, () => {
      it("should do nothing when child is not menu item or sub menu", () => {
        const children = [<MenuSeparator />];
        expect(addIdToChildren(children)).toEqual(children);
      });

      it("should add id when menu item does not have id", () => {
        const menuItem = <MenuItem>View</MenuItem>;
        expect(addIdToChildren([menuItem])[0].props.id).not.toBeNull();
      });

      it("should keep the id when menu item has id", () => {
        const menuItem = <MenuItem id="id">View</MenuItem>;
        expect(addIdToChildren([menuItem])[0].props.id).toBe("id");
      });

      it("should add id to button when submenu button does not have id", () => {
        const subMenu = <SubMenu menuRootElement={<MenuItem>File</MenuItem>} />;
        expect(
          addIdToChildren([subMenu])[0].props.menuRootElement.props.id
        ).not.toBeNull();
      });

      it("should keep the button id when submenu button has id", () => {
        const subMenu = (
          <SubMenu menuRootElement={<MenuItem id="id">File</MenuItem>} />
        );
        expect(
          addIdToChildren([subMenu])[0].props.menuRootElement.props.id
        ).toBe("id");
      });
    });

    describe(buildMenuIndexes, () => {
      it("should return empty array with empty children", () => {
        const children = [];
        expect(buildMenuIndexes(children)).toEqual([]);
      });

      it("should return empty array with just MenuSeparator", () => {
        const children = [<MenuSeparator />];
        expect(buildMenuIndexes(children)).toEqual([]);
      });

      it("should return correct result with one MenuItem", () => {
        const children = [<MenuItem>View</MenuItem>];
        expect(buildMenuIndexes(children)).toMatchInlineSnapshot(`
        Array [
          Object {
            "id": undefined,
            "index": 0,
          },
        ]
      `);
      });

      it("should return correct result with one SubMenu", () => {
        const children = [
          <SubMenu
            id="sub"
            menuRootElement={<MenuItem id="button">File</MenuItem>}
          >
            <MenuItem>View</MenuItem>
            <MenuItem>Edit</MenuItem>
            <MenuItem>Delete</MenuItem>
          </SubMenu>,
        ];
        expect(buildMenuIndexes(children)).toMatchInlineSnapshot(`
        Array [
          Object {
            "id": "button",
            "index": 0,
            "length": 3,
          },
        ]
      `);
      });

      it("should return correct result with one MenuItem and one SubMenu", () => {
        const children = [
          <SubMenu
            id="sub"
            menuRootElement={<MenuItem id="button">File</MenuItem>}
          >
            <MenuItem>View</MenuItem>
            <MenuItem>Edit</MenuItem>
            <MenuItem>Delete</MenuItem>
          </SubMenu>,
          <MenuItem id="help">Help</MenuItem>,
        ];
        expect(buildMenuIndexes(children)).toMatchInlineSnapshot(`
        Array [
          Object {
            "id": "button",
            "index": 0,
            "length": 3,
          },
          Object {
            "id": "help",
            "index": 1,
          },
        ]
      `);
      });
    });

    describe(layoutChildren, () => {
      let handleMenuKeyDown;
      let handleMenuMouseMove;
      let handleMenuBlur;
      beforeEach(() => {
        handleMenuKeyDown = jest.fn();
        handleMenuMouseMove = jest.fn();
        handleMenuBlur = jest.fn();
      });

      it("should render active menu item correctly", () => {
        const menuIndexes = [{ index: 1 }];
        const cursor = 0;
        const children = [<MenuSeparator />, <MenuItem id="1">View</MenuItem>];
        const result = layoutChildren(
          children,
          handleMenuKeyDown,
          handleMenuMouseMove,
          handleMenuBlur,
          menuIndexes,
          cursor,
          "",
          1
        );
        const { getByRole } = render(result);
        const menuItem = getByRole("menuitem");
        expect(menuItem).toMatchInlineSnapshot(`
        <div
          class="neo-dropdown__link neo-dropdown__link-active"
          id="1"
          role="menuitem"
          tabindex="0"
        >
          View
        </div>
      `);
      });

      it("should render active sub menu correctly", () => {
        const menuIndexes = [{ index: 0 }, { index: 1, length: 2 }];
        const cursor = 1;
        const testId = "submenu-test-id";
        const children = [
          <MenuItem id="1">View</MenuItem>,
          <SubMenu
            id="2"
            menuRootElement={
              <MenuItem id="20" data-testid={testId}>
                SubMenu
              </MenuItem>
            }
          >
            <MenuItem id="21">SubMenu-1</MenuItem>
            <MenuItem id="22">SubMenu-2</MenuItem>
            <MenuItem id="23">SubMenu-3</MenuItem>
          </SubMenu>,
        ];
        const result = layoutChildren(
          children,
          handleMenuKeyDown,
          handleMenuMouseMove,
          handleMenuBlur,
          menuIndexes,
          cursor,
          "ENTER_SUB_MENU",
          10
        );
        const { getByTestId, container } = render(result);
        const subMenu = getByTestId(testId);
        expect(subMenu).toMatchInlineSnapshot(`
        <div
          class="neo-dropdown__link neo-dropdown__link-active"
          data-testid="submenu-test-id"
          id="20"
          role="menuitem"
          tabindex="0"
        >
          SubMenu
        </div>
      `);
        expect(container).toMatchInlineSnapshot(`
        <div>
          <div
            class="neo-dropdown__content"
            role="menu"
            tabindex="-1"
          >
            <div
              class="neo-dropdown__link"
              id="1"
              role="menuitem"
              tabindex="-1"
            >
              View
            </div>
            <div
              class="neo-dropdown__item neo-dropdown--active"
              id="2"
            >
              <div
                class="neo-dropdown__link neo-dropdown__link-active"
                data-testid="submenu-test-id"
                id="20"
                role="menuitem"
                tabindex="0"
              >
                SubMenu
              </div>
              <div
                class="neo-dropdown__content"
                role="menu"
                tabindex="-1"
              >
                <div
                  class="neo-dropdown__link neo-dropdown__link-active"
                  id="21"
                  role="menuitem"
                  tabindex="0"
                >
                  SubMenu-1
                </div>
                <div
                  class="neo-dropdown__link"
                  id="22"
                  role="menuitem"
                  tabindex="-1"
                >
                  SubMenu-2
                </div>
                <div
                  class="neo-dropdown__link"
                  id="23"
                  role="menuitem"
                  tabindex="-1"
                >
                  SubMenu-3
                </div>
              </div>
            </div>
          </div>
        </div>
      `);
      });

      it("should render inactive menu item correctly", () => {
        const menuIndexes = [{ index: 1 }];
        const cursor = 2;
        const children = [
          <MenuSeparator />,
          <MenuItem id="1" data-testid="inactive">
            View
          </MenuItem>,
        ];
        const result = layoutChildren(
          children,
          handleMenuKeyDown,
          handleMenuMouseMove,
          handleMenuBlur,
          menuIndexes,
          cursor,
          "",
          1
        );
        const { getByTestId } = render(result);
        const menuItem = getByTestId("inactive");
        expect(menuItem).toMatchInlineSnapshot(`
        <div
          class="neo-dropdown__link"
          data-testid="inactive"
          id="1"
          role="menuitem"
          tabindex="-1"
        >
          View
        </div>
      `);
      });

      it("should render inactive sub menu correctly", () => {
        const menuIndexes = [{ index: 0 }, { index: 1, length: 2 }];
        const cursor = 0;
        const testId = "submenu-test-id";
        const children = [
          <MenuItem id="1">View</MenuItem>,
          <SubMenu
            id="2"
            menuRootElement={
              <MenuItem id="20" data-testid={testId}>
                SubMenu
              </MenuItem>
            }
          >
            <MenuItem id="21">SubMenu-1</MenuItem>
            <MenuItem id="22">SubMenu-2</MenuItem>
            <MenuItem id="23">SubMenu-3</MenuItem>
          </SubMenu>,
        ];
        const result = layoutChildren(
          children,
          handleMenuKeyDown,
          handleMenuMouseMove,
          handleMenuBlur,
          menuIndexes,
          cursor,
          "ENTER_SUB_MENU",
          10
        );
        const { getByTestId } = render(result);
        const subMenu = getByTestId(testId);
        expect(subMenu).toMatchInlineSnapshot(`
        <div
          class="neo-dropdown__link"
          data-testid="submenu-test-id"
          id="20"
          role="menuitem"
          tabindex="-1"
        >
          SubMenu
        </div>
      `);
      });

      it("should render menu separator correctly", () => {
        const menuIndexes = [{ index: 1 }];
        const cursor = 0;
        const children = [
          <MenuSeparator data-testid="separator" />,
          <MenuItem id="1">View</MenuItem>,
        ];
        const result = layoutChildren(
          children,
          handleMenuKeyDown,
          handleMenuMouseMove,
          handleMenuBlur,
          menuIndexes,
          cursor,
          "",
          1
        );
        const { getByTestId } = render(result);
        const menuItem = getByTestId("separator");
        expect(menuItem).toMatchInlineSnapshot(`
        <hr
          class="neo-dropdown__separator"
          data-testid="separator"
        />
      `);
      });
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
        // ignore example `console.log` calls
        jest.spyOn(console, "log").mockImplementation(() => {});

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

import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import log from "loglevel";
import { MenuItem } from "./MenuItem";
import { MenuSeparator } from "./MenuSeparator";
import {
  addIdToChildren,
  buildMenuIndexes,
  layoutChildren,
  SubMenu,
} from "./SubMenu";
import * as SubMenuStories from "./SubMenu.stories";

const subMenuLogger = log.getLogger("submenu");
subMenuLogger.disableAll();
const keyboardLogger = log.getLogger("menu-keyboard-event-handler");
keyboardLogger.disableAll();
const mouseLogger = log.getLogger("menu-mouse-event-handler");
mouseLogger.disableAll();

const { WithSeparator } = composeStories(SubMenuStories);
describe("Storybook tests", () => {
  describe("WithSeparator", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<WithSeparator action="ENTER_SUB_MENU" />);
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

    it("should advance cursor to next menu item with ArrowDown", async () => {
      const { getByText } = renderResult;
      const button = getByText("Item1");
      expect(button).toHaveFocus();

      // button arrowdown will open menu and move focus to first menu item
      userEvent.keyboard("{ArrowDown}");
      const item2 = await screen.queryByText("Item2");
      expect(item2).toHaveAttribute("tabindex", "0");

      const item3 = screen.getByText("Item3");
      userEvent.hover(item3);
      userEvent.hover(item3);

      const item3Updated = await screen.queryByText("Item3");
      expect(item3Updated).toHaveAttribute("tabindex", "0");
    });
  });
});

describe("SubMenu helper methods", () => {
  describe(addIdToChildren, () => {
    it("should do nothing when child is not menu item or sub menu", () => {
      const children = [<MenuSeparator />];
      expect(addIdToChildren(children)).toEqual(children);
    });
    it("should add id when menu item does not have id", () => {
      const menuItem = <MenuItem text="View" />;
      expect(addIdToChildren([menuItem])[0].props.id).not.toBeNull();
    });
    it("should keep the id when menu item has id", () => {
      const menuItem = <MenuItem id="id" text="View" />;
      expect(addIdToChildren([menuItem])[0].props.id).toBe("id");
    });
    it("should add id to button when submenu button does not have id", () => {
      const subMenu = <SubMenu button={<MenuItem text="File" />} />;
      expect(
        addIdToChildren([subMenu])[0].props.button.props.id
      ).not.toBeNull();
    });
    it("should keep the button id when submenu button has id", () => {
      const subMenu = <SubMenu button={<MenuItem id="id" text="File" />} />;
      expect(addIdToChildren([subMenu])[0].props.button.props.id).toBe("id");
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
      const children = [<MenuItem text="View" />];
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
        <SubMenu id="sub" button={<MenuItem text="File" id="button" />}>
          <MenuItem text="View" />
          <MenuItem text="Edit" />
          <MenuItem text="Delete" />
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
        <SubMenu id="sub" button={<MenuItem text="File" id="button" />}>
          <MenuItem text="View" />
          <MenuItem text="Edit" />
          <MenuItem text="Delete" />
        </SubMenu>,
        <MenuItem id="help" text="Help" />,
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
      const children = [
        <MenuSeparator />,
        <MenuItem id="1" text="View" href="fixme" />,
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
      const { getByRole } = render(result);
      const menuItem = getByRole("menuitem");
      expect(menuItem).toMatchInlineSnapshot(`
      <a
        class="neo-dropdown__link neo-dropdown__link-active"
        href="fixme"
        id="1"
        role="menuitem"
        tabindex="0"
      >
        View
      </a>
    `);
    });
    it("should render active sub menu correctly", () => {
      const menuIndexes = [{ index: 0 }, { index: 1, length: 2 }];
      const cursor = 1;
      const testId = "submenu-test-id";
      const children = [
        <MenuItem id="1" text="View" href="fixme" />,
        <SubMenu
          id="2"
          button={
            <MenuItem
              id="20"
              text="SubMenu"
              data-testid={testId}
              href="fixme"
            ></MenuItem>
          }
        >
          <MenuItem id="21" text="SubMenu-1" href="fixme" />
          <MenuItem id="22" text="SubMenu-2" href="fixme" />
          <MenuItem id="23" text="SubMenu-3" href="fixme" />
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
      <a
        class="neo-dropdown__link neo-dropdown__link-active"
        data-testid="submenu-test-id"
        href="fixme"
        id="20"
        role="menuitem"
        tabindex="0"
      >
        SubMenu
      </a>
    `);
      expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="neo-dropdown__content"
          role="menu"
          tabindex="-1"
        >
          <a
            class="neo-dropdown__link"
            href="fixme"
            id="1"
            role="menuitem"
            tabindex="-1"
          >
            View
          </a>
          <div
            class="neo-dropdown__item neo-dropdown--active"
            id="2"
          >
            <a
              class="neo-dropdown__link neo-dropdown__link-active"
              data-testid="submenu-test-id"
              href="fixme"
              id="20"
              role="menuitem"
              tabindex="0"
            >
              SubMenu
            </a>
            <div
              class="neo-dropdown__content"
              role="menu"
              tabindex="-1"
            >
              <a
                class="neo-dropdown__link neo-dropdown__link-active"
                href="fixme"
                id="21"
                role="menuitem"
                tabindex="0"
              >
                SubMenu-1
              </a>
              <a
                class="neo-dropdown__link"
                href="fixme"
                id="22"
                role="menuitem"
                tabindex="-1"
              >
                SubMenu-2
              </a>
              <a
                class="neo-dropdown__link"
                href="fixme"
                id="23"
                role="menuitem"
                tabindex="-1"
              >
                SubMenu-3
              </a>
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
        <MenuItem id="1" text="View" href="fixme" data-testid="inactive" />,
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
      <a
        class="neo-dropdown__link"
        data-testid="inactive"
        href="fixme"
        id="1"
        role="menuitem"
        tabindex="-1"
      >
        View
      </a>
    `);
    });
    it("should render inactive sub menu correctly", () => {
      const menuIndexes = [{ index: 0 }, { index: 1, length: 2 }];
      const cursor = 0;
      const testId = "submenu-test-id";
      const children = [
        <MenuItem id="1" text="View" href="fixme" />,
        <SubMenu
          id="2"
          button={
            <MenuItem
              id="20"
              text="SubMenu"
              data-testid={testId}
              href="fixme"
            ></MenuItem>
          }
        >
          <MenuItem id="21" text="SubMenu-1" href="fixme" />
          <MenuItem id="22" text="SubMenu-2" href="fixme" />
          <MenuItem id="23" text="SubMenu-3" href="fixme" />
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
      <a
        class="neo-dropdown__link"
        data-testid="submenu-test-id"
        href="fixme"
        id="20"
        role="menuitem"
        tabindex="-1"
      >
        SubMenu
      </a>
    `);
    });
    it("should render menu separator correctly", () => {
      const menuIndexes = [{ index: 1 }];
      const cursor = 0;
      const children = [
        <MenuSeparator data-testid="separator" />,
        <MenuItem id="1" text="View" href="fixme" />,
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

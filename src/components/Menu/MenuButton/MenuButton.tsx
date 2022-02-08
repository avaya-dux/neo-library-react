import { FC } from "react";

import { Button, ButtonProps } from "components/Button";

/**
 * The MenuButton is meant to be used only for the Menu component prop `menuRootElement`.
 *
 * @example
 * <Menu
      menuRootElement={
        <MenuButton onClick={() => console.log("Functional Menu opened")}>
          Functional Menu
        </MenuButton>
      }
    >
      <MenuItem onClick={() => console.log("first menu item was clicked")}>
        Console log click
      </MenuItem>
      <MenuItem disabled>Menu Item 2</MenuItem>
      <MenuItem>
        <a
          href="https://design.avayacloud.com/components/web/setup-web"
          target="_blank"
        >
          Go to Portal
        </a>
      </MenuItem>
    </Menu>
 */
export const MenuButton: FC<ButtonProps> = ({ children, ...rest }) => (
  <Button className="neo-dropdown__link-header" {...rest}>
    {children || "Menu Button"}
  </Button>
);
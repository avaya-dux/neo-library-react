import { ReactElement } from "react";

import { ButtonProps } from "components/Button";

export interface MenuSeparatorProps
  extends React.HTMLAttributes<HTMLHRElement> {}

export type ActionType = "ENTER_SUB_MENU" | "ACTIVATE_MENU_ITEM" | "";
// TODO-737: disabled
export interface MenuItemProps
  extends React.AnchorHTMLAttributes<HTMLDivElement> {
  counter?: number;
  disabled?: boolean;
  hasFocus?: boolean;
  isActive?: boolean;
}
export interface SubMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  menuRootElement: ReactElement<MenuItemProps>;
  children: ReactElement<MenuItemProps | SubMenuProps | MenuSeparatorProps>[];
  action?: ActionType;
  counter?: number;
}

export type MenuChildrenType = ReactElement<
  MenuItemProps | SubMenuProps | MenuSeparatorProps
>[];

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children: MenuChildrenType;
  closeOnBlur?: boolean; // if `true` (default), the menu will close when you click outside the menu list
  defaultIsOpen?: boolean;
  itemAlignment?: "left" | "right";
  menuRootElement: ReactElement<ButtonProps>;
  onMenuClose?: () => void;
  openOnHover?: boolean;
}

export type MenuIndexesType = {
  index?: number;
  id?: string;
  length?: number;
}[];

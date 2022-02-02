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
  // active?: boolean; // BUG-797: not implemented
  // isHover?: boolean; // BUG-797: not implemented
  children: MenuChildrenType;
  defaultIsOpen?: boolean;
  menuRootElement: ReactElement<ButtonProps>;
  itemAlignment?: "left" | "right";
}

export type MenuIndexesType = {
  index?: number;
  id?: string;
  length?: number;
}[];

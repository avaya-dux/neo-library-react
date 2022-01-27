import { ReactElement } from "react";

import { ButtonProps } from "components/Button";

export interface MenuSeparatorProps
  extends React.HTMLAttributes<HTMLHRElement> {}

export type ActionType = "ENTER_SUB_MENU" | "ACTIVATE_MENU_ITEM" | "";
// TODO-737: disabled
export interface MenuItemProps
  extends React.AnchorHTMLAttributes<HTMLDivElement> {
  hasFocus?: boolean;
  isActive?: boolean;
  counter?: number;
}
export interface SubMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  button: ReactElement<MenuItemProps>;
  children: ReactElement<MenuItemProps | SubMenuProps | MenuSeparatorProps>[];
  action?: ActionType;
  counter?: number;
}

export type MenuChildrenType = ReactElement<
  MenuItemProps | SubMenuProps | MenuSeparatorProps
>[];

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  // active?: boolean; // BUG: not implemented
  // isHover?: boolean; // BUG: not implemented
  children: MenuChildrenType;
  menuRootElement: ReactElement<ButtonProps>;
  rightAligned?: boolean;
}

export type MenuIndexesType = {
  index?: number;
  id?: string;
  length?: number;
}[];

import { ButtonProps } from "components/Button";
import { ReactElement } from "react";

export interface MenuSeparatorProps
  extends React.HTMLAttributes<HTMLHRElement> {}

export type ActionType = "ENTER_SUB_MENU" | "ACTIVATE_MENU_ITEM" | "";
// TODO-737: disabled
export interface MenuItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
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
  active?: boolean;
  isHover?: boolean;
  rightAligned?: boolean;
  button: ReactElement<ButtonProps>;
  children: MenuChildrenType;
}

export type MenuIndexesType = {
  index?: number;
  id?: string;
  length?: number;
}[];

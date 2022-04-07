import { ReactElement } from "react";
import { TopLinkItemProps } from "./TopLinkItem";
import { IconNamesType } from "utils";
export interface LeftNavProps extends React.BaseHTMLAttributes<HTMLElement> {
  currentUrl: string;
  onSelected?: (id: string, url: string) => void;
  children?:
    | ReactElement<NavCategoryProps | TopLinkItemProps>
    | ReactElement<NavCategoryProps | TopLinkItemProps>[];
}

export interface NavigationContextType {
  currentUrl: string;
  onSelected?: (id: string, url: string) => void;
}

export interface NavCategoryProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: IconNamesType;
  expanded?: boolean;
  disabled?: boolean;
  active?: boolean;
  children?: ReactElement<LinkItem
}

export interface LinkItemProps
  extends HTMLAttributes<HTMLLIElement | HTMLAnchorElement> {
  children: string;
  active?: boolean;
  disabled?: boolean;
  href?: string;
}
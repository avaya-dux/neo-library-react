import { MenuProps } from "components/Menu";
import { ReactElement, ReactNode } from "react";
import { IconNamesType } from "utils";

export interface TabProps extends React.HTMLAttributes<HTMLLIElement> {
  id?: string;
  children: ReactNode;
  disabled?: boolean;
  icon?: IconNamesType;
}

export interface ClosableTabProps extends Omit<TabProps, "dir"> {
  onClose?: (index: number) => void;
}

export interface TabListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: ReactElement<TabProps | ClosableTabProps>[];
}

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface TabPanelsProps {
  children: ReactElement<TabPanelProps>[];
}
interface Oritentation {
  orientation?: "horizontal" | "vertical";
}

interface CommonTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultIndex?: number;
  index?: number;
  children: [ReactElement<TabListProps>, ReactElement<TabPanelsProps>];
  onTabChange?: (index: number) => void;
}
export interface HorizontalTabsProps extends CommonTabsProps, Oritentation {
  orientation?: "horizontal";
  hasCarousel?: boolean;
  carouselDropdown?: ReactElement<MenuProps>;
  leftCarouselButtonAriaLabel?: string;
  rightCarouselButtonAriaLabel?: string;
}

export interface VerticalTabsProps extends CommonTabsProps, Oritentation {
  orientation: "vertical";
  scrollable?: boolean;
}

export type TabsProps = HorizontalTabsProps | VerticalTabsProps;

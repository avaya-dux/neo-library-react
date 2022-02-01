import { IconNamesType } from "utils";
import { ReactNode, Dispatch, SetStateAction, ReactElement } from "react";

export interface TabProps
  extends Omit<React.HTMLAttributes<HTMLLIElement>, "dir"> {
  id?: string;
  children: ReactNode;
  disabled?: boolean;
  icon?: IconNamesType;
  dir?: "ltr" | "rtl";
}

export interface ClosableTabProps extends Omit<TabProps, "dir"> {
  closable: true;
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
}

export interface VerticalTabsProps extends CommonTabsProps, Oritentation {
  orientation: "vertical";
  scrollable?: boolean;
}

export type TabsProps = HorizontalTabsProps | VerticalTabsProps;

export interface InternalTabProps extends React.HTMLAttributes<HTMLLIElement> {
  id: string;
  name: ReactNode;
  disabled: boolean;
  content: TabPanelProps;
  icon?: IconNamesType;
  closable?: boolean;
  onClose?: (index: number) => void;
}

export interface InteractiveTabProps {
  tabIndex: number;
  vertical: boolean;
  active: boolean;
  tabs: InternalTabProps[];
  activeTabIndex: number;
  setActiveTabIndex: Dispatch<SetStateAction<number>>;
  setActivePanelIndex: Dispatch<SetStateAction<number>>;
}

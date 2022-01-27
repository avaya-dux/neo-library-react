import { IconNamesType } from "utils";
import { ReactNode, Dispatch, SetStateAction, ReactElement } from "react";

export interface TabProps extends React.HTMLAttributes<HTMLLIElement> {
  id?: string;
  children: ReactNode;
  disabled?: boolean;
  icon?: IconNamesType;
}

export interface ClosableTabProps extends TabProps {
  closable: true;
  onClose?: () => {};
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

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultIndex?: number;
  index?: number;
  children: [ReactElement<TabListProps>, ReactElement<TabPanelsProps>];
  onTabChange?: (index: number) => void;
}

export interface VerticalTabsProps extends TabsProps {
  orientation: "vertical";
  scrollable?: boolean;
}

export interface InternalTabProps extends React.HTMLAttributes<HTMLLIElement> {
  id: string;
  name: ReactNode;
  disabled: boolean;
  content: TabPanelProps;
  icon?: IconNamesType;
}

export interface InteractiveTabProps {
  vertical: boolean;
  active: boolean;
  tabs: InternalTabProps[];
  activeTabIndex: number;
  setActiveTabIndex: Dispatch<SetStateAction<number>>;
  setActivePanelIndex: Dispatch<SetStateAction<number>>;
}

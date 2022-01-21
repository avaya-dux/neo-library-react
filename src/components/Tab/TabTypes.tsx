import { IconNamesType } from "utils";
import { ReactNode, Dispatch, SetStateAction, ReactElement } from "react";

export interface TabProps extends React.HTMLAttributes<HTMLLIElement> {
  id?: string;
  children: string;
  disabled?: boolean;
}

export interface IconTabProps extends TabProps {
  icon: IconNamesType;
  isIconOnRight?: boolean;
}

export interface ClosableTabProps extends TabProps {
  closable: true;
  onClose?: () => {};
}

export interface ClosableIconTabProps extends IconTabProps, ClosableTabProps {}

export interface TabListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: ReactElement<
    TabProps | IconTabProps | ClosableTabProps | ClosableIconTabProps
  >[];
}

export interface TabPanelProps {
  children: ReactNode;
}

export interface TabPanelsProps {
  children: ReactElement<TabPanelProps>[];
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultTabId: string;
  children: [ReactElement<TabListProps>, ReactElement<TabPanelsProps>];
}

export interface VerticalTabsProps extends TabsProps {
  isVertical: true;
  isScrollable?: boolean;
}
export interface TabsInterface {
  activeTabId: string;
  disableActiveTab: () => void;
  enableActiveTab: () => void;
  disableAllTabs: () => void;
  enableAllTabs: () => void;
}

export interface InternalTabProps extends React.HTMLAttributes<HTMLLIElement> {
  id: string;
  disabled: boolean;
  name: string;
  content: ReactNode;
}

export interface InteractiveTabProps {
  active: boolean;
  tabs: InternalTabProps[];
  activeTabId: string;
  setActiveTabId: Dispatch<SetStateAction<string>>;
  setActivePanelId: Dispatch<SetStateAction<string>>;
}

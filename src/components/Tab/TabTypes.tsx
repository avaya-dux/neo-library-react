import { ReactNode } from "react";
import { IconNamesType } from "utils";

export interface TabProps {
  icon?: { name: IconNamesType; isIconOnRight?: boolean };
  id: string;
  name: string;
  disabled?: boolean;
  onSelect?: () => {};
  content: ReactNode;
}

export interface ClosableTabProps extends TabProps {
  closable: true;
  onClose?: () => {};
}
export interface TabListProps {
  activeTabId: string;
  tabItems: TabProps[];
}

export interface VerticalTabListProps extends TabListProps {
  isScrollable?: boolean;
}

export interface TabInterface {
  activeTabId: string;
  disableActiveTab: () => void;
  enableActiveTab: () => void;
}

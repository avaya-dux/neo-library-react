import { ReactNode } from "react";
import { IconNamesType } from "utils";

export interface TabItemProps {
  icon?: { name: IconNamesType; isIconOnRight?: boolean };
  id: string;
  disabled?: boolean;
  onSelect?: () => {};
  content: ReactNode;
}

export interface ClosableTabItemProps extends TabItemProps {
  closable: true;
  onClose?: () => {};
}
export interface TabListProps {
  activeTabItemId: string;
  tabItems: TabItemProps[];
}

export interface VerticalTabListProps extends TabListProps {
  isScrollable?: boolean;
}

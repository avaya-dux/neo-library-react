import { RightHeaderProps } from "./WidgetTypes";

export const RightHeader = ({ children }: RightHeaderProps) => {
  return <div className="neo-widget__header-right">{children}</div>;
};

import { LeftHeaderProps } from "./WidgetTypes";

export const LeftHeader = ({ children }: LeftHeaderProps) => {
  return <div className="neo-widget__header-left">{children}</div>;
};

import { FC } from "react";
import { LeftHeaderProps } from "./WidgetTypes";

export const LeftHeader: FC<LeftHeaderProps> = ({ children }) => {
  return <div className="neo-widget__header-left">{children}</div>;
};

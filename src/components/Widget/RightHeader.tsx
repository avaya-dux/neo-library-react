import { FC } from "react";
import { RightHeaderProps } from "./WidgetTypes";

export const RightHeader: FC<RightHeaderProps> = ({ children }) => {
  return <div className="neo-widget__header-right">{children}</div>;
};

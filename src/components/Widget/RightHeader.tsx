import clsx from "clsx";
import { RightHeaderProps } from "./WidgetTypes";

export const RightHeader = ({
  children,
  className,
  ...rest
}: RightHeaderProps) => {
  return (
    <div className={clsx("neo-widget__header-right", className)} {...rest}>
      {children}
    </div>
  );
};

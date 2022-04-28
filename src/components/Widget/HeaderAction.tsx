import clsx from "clsx";
import { HeaderActionProps } from "./WidgetTypes";

export const HeaderAction = ({
  children,
  className,
  ...rest
}: HeaderActionProps) => {
  return (
    <div className={clsx("neo-widget__header-right", className)} {...rest}>
      {children}
    </div>
  );
};

import clsx from "clsx";
import { FC, useContext } from "react";
import { WidgetContext } from "./WidgetContext";
import { BodyProps } from "./WidgetTypes";

export const Body: FC<BodyProps> = ({ children }) => {
  const { loading, empty } = useContext(WidgetContext);
  return (
    <div
      className={clsx(
        "neo-widget__body neo-widget__body",
        loading && "neo-widget__body--loading"
      )}
    >
      {empty ? (
        <div className="neo-empty-state">
          <p className="neo-icon-info">This widget has no content</p>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

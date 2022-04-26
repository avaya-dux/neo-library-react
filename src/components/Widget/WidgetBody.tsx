import clsx from "clsx";
import { CSSProperties, FC, useContext } from "react";
import { WidgetContext } from "./WidgetContext";
import { BodyProps } from "./WidgetTypes";

export const getStyle = ({
  style,
  fixedHeight,
  fixedWidth,
}: {
  style?: CSSProperties;
  fixedHeight?: number;
  fixedWidth?: number;
} = {}): CSSProperties => {
  return { ...style, height: fixedHeight, width: fixedWidth };
};
export const WidgetBody: FC<BodyProps> = ({
  children,
  isMessage = false,
  className,
  fixedHeight,
  fixedWidth,
  style,
  ...rest
}) => {
  const { loading, empty, disabled } = useContext(WidgetContext);

  return (
    <div
      className={clsx(
        "neo-widget__body neo-widget__body",
        loading && "neo-widget__body--loading",
        disabled && "neo-widget__body-disabled",
        className
      )}
      style={getStyle({ style, fixedHeight, fixedWidth })}
      {...rest}
    >
      {empty ? (
        <div className="neo-empty-state">
          <p className="neo-icon-info">This widget has no content</p>
        </div>
      ) : isMessage ? (
        <p
          className={clsx(
            "neo-widget__message",
            disabled && "neo-widget__message-disabled"
          )}
        >
          {children}
        </p>
      ) : (
        children
      )}
    </div>
  );
};

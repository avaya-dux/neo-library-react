import clsx from "clsx";
import { HTMLAttributes, ReactNode, useMemo } from "react";
import { isString } from "utils/isString";
import { v4 as uuidv4 } from "uuid";

import {
  getMultilineClassName,
  getTooltipPosition,
  TooltipPosition,
} from "./helpers";

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  arrow?: boolean;
  children: ReactNode;
  label: string;
  multiline?: boolean;
  position?: TooltipPosition;
}

export const Tooltip = ({
  arrow = true,
  children,
  id = uuidv4(), // TODO-NEO-575 HACK: should not be using id generation
  label,
  multiline,
  position = "bottom", // TODO-NEO-575: "auto"

  ...rest
}: TooltipProps) => {
  const tooltipPosition = useMemo(
    () => getTooltipPosition(position),
    [position]
  );

  const multilineClassName = useMemo(
    () => getMultilineClassName(multiline),
    [multiline]
  );

  return (
    <div
      className={`neo-tooltip neo-tooltip--${tooltipPosition} neo-tooltip--onhover`}
      {...rest}
    >
      {isString(children) ? (
        <div aria-describedby={id}>{children}</div>
      ) : (
        // https://reactjs.org/docs/react-api.html#cloneelement
        children // TODO-NEO-575: need to pass `id` down here... or wrap it...
      )}

      <div
        className={clsx("neo-tooltip__content", multilineClassName)}
        role="tooltip"
        id={id}
      >
        {arrow && <div className="neo-arrow" />}
        {label}
      </div>
    </div>
  );
};

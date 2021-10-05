import clsx from "clsx";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

import { genId } from "utils/accessibilityUtils";
import { isString } from "utils/isString";

import {
  getIdealTooltipPosition,
  getMultilineClassName,
  translatePositionToCSSName,
} from "./helpers";
import { TooltipProps } from "./TooltipTypes";

export const Tooltip = ({
  arrow = true,
  children,
  id = genId(),
  label,
  multiline,
  position = "auto",

  ...rest
}: TooltipProps) => {
  const tooltipContainerRef = useRef(null);

  const [tooltipPosition, setTooltipPosition] = useState("");
  useLayoutEffect(() => {
    setTooltipPosition(
      position === "auto"
        ? getIdealTooltipPosition(
            {
              height: document.lastElementChild?.clientHeight || 0,
              width: document.lastElementChild?.clientWidth || 0,
            },
            label,
            tooltipContainerRef.current
          )
        : translatePositionToCSSName(position)
    );
  }, [label, position, tooltipContainerRef]);

  const multilineClassName = useMemo(
    () => getMultilineClassName(multiline),
    [multiline]
  );

  return (
    <div
      className={`neo-tooltip neo-tooltip--${tooltipPosition} neo-tooltip--onhover`}
      ref={tooltipContainerRef}
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

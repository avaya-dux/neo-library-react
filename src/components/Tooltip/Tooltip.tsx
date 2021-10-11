import clsx from "clsx";
import {
  Children,
  cloneElement,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { genId, isString } from "utils";

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

  const wrappedChildren = useMemo(() => {
    const shouldWrap = isString(children) || Children.count(children) > 1;
    if (shouldWrap) {
      return <div aria-describedby={id}>{children}</div>;
    } else {
      const child = Children.only(children) as React.ReactElement;
      return cloneElement(child, { "aria-describedby": id });
    }
  }, [isString, children]);

  return (
    <div
      className={`neo-tooltip neo-tooltip--${tooltipPosition} neo-tooltip--onhover`}
      ref={tooltipContainerRef}
      {...rest}
    >
      {wrappedChildren}

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

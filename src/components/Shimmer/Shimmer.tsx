import clsx from "clsx";
import { DetailedHTMLProps, HTMLAttributes } from "react";

import { SizeType } from "utils";

export interface ShimmerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  shape?: "circle" | "rectangle";
  size?: Omit<SizeType, "xs" | "xl">;
}

/**
 * An animated placeholder that informs users that content or data is still loading
 *
 * @example <Shimmer />
 * @example <Shimmer shape="circle" size="lg" />
 *
 * @see https://design.avayacloud.com/components/web/shimmer-web
 * @see https://neo-library-react-storybook.netlify.app/?path=/story/components-shimmer
 */
export const Shimmer = ({
  className,
  shape = "rectangle",
  size = "sm",
  ...rest
}: ShimmerProps) => {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      role="alert"
      className={clsx(
        "neo-shimmer",
        shape === "rectangle" && "neo-shimmer__rectangle",
        shape === "circle" && size === "sm" && "neo-shimmer__circle--small",
        shape === "circle" && size === "md" && "neo-shimmer__circle--medium",
        shape === "circle" && size === "lg" && "neo-shimmer__circle--large",
        className
      )}
      {...rest}
    ></div>
  );
};

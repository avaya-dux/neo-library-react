import clsx from "clsx";
import { RightHeader } from "./RightHeader";
import { WidgetBody } from "./WidgetBody";
import { WidgetContext } from "./WidgetContext";
import { ThreeChildren, WidgetProps } from "./WidgetTypes";

/**
 * normalize children to an array of three elements
 * @param children could be single element, 2 elements, or 3 elements
 * @returns an array of 3 elements
 */
function toArray(children: WidgetProps["children"]): ThreeChildren {
  const ret = Array.isArray(children) ? [...children] : [children];
  if (ret.length === 1) {
    ret.push(<RightHeader />);
  }
  if (ret.length === 2) {
    ret.push(<WidgetBody />);
  }
  return ret as unknown as ThreeChildren;
}
export const Widget = ({
  loading = false,
  empty = false,
  disabled = false,
  children,
}: WidgetProps) => {
  const [headerLeft, headerRight, body] = toArray(children);
  return (
    <WidgetContext.Provider value={{ loading, empty, disabled }}>
      <div className="neo-widget__content">
        <div
          className={clsx(
            "neo-widget__header",
            disabled && "neo-widget__header-disabled"
          )}
        >
          {headerLeft}
          {headerRight}
        </div>
        {body}
      </div>
    </WidgetContext.Provider>
  );
};

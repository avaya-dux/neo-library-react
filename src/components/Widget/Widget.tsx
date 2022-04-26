import { FC } from "react";
import { RightHeader } from "./RightHeader";
import { Body } from "./WidgetBody";
import { WidgetContext } from "./WidgetContext";
import { ThreeChildren, WidgetProps } from "./WidgetTypes";

function toArray(children: WidgetProps["children"]): ThreeChildren {
  const ret = Array.isArray(children) ? [...children] : [children];
  if (ret.length === 1) {
    ret.push(<RightHeader />);
  }
  if (ret.length === 2) {
    ret.push(<Body />);
  }
  return ret as unknown as ThreeChildren;
}
export const Widget: FC<WidgetProps> = ({
  loading = false,
  empty = false,
  children,
}) => {
  const [headerLeft, headerRight, body] = toArray(children);
  return (
    <WidgetContext.Provider value={{ loading, empty }}>
      <div className="neo-widget__content">
        <div className="neo-widget__header">
          {headerLeft}
          {headerRight}
        </div>
        {body}
      </div>
    </WidgetContext.Provider>
  );
};

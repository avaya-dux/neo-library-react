import {
  ReactFragment,
  ReactNode,
  ReactPortal,
  ReactChild,
  ReactElement,
} from "react";

export type LeftHeaderProps = {
  children: ReactChild | ReactFragment | ReactPortal;
};
export type RightHeaderProps = { children?: ReactNode };

export type BodyProps = { children?: ReactNode };

export type ContextProps = {
  loading: boolean;
  empty: boolean;
};
export type ThreeChildren = [
  ReactElement<LeftHeaderProps>,
  ReactElement<RightHeaderProps>,
  ReactElement<BodyProps>
];
export type BothHeaders = [
  ReactElement<LeftHeaderProps>,
  ReactElement<RightHeaderProps>
];
export type WidgetProps = {
  children: ThreeChildren | BothHeaders | ReactElement<LeftHeaderProps>;
} & Partial<ContextProps>;

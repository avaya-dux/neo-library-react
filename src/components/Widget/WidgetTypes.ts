import {
  ReactFragment,
  ReactNode,
  ReactPortal,
  ReactChild,
  ReactElement,
  HTMLAttributes,
} from "react";

export type HeaderProps = {
  children: ReactChild | ReactFragment | ReactPortal;
};
export type HeaderActionProps = {
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export type ContentProps = {
  children?: ReactNode;
  asText?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export type ContextProps = {
  loading: boolean;
  empty: boolean;
  disabled: boolean;
};
export type ThreeChildren = [
  ReactElement<HeaderProps>,
  ReactElement<HeaderActionProps>,
  ReactElement<ContentProps>
];
export type BothHeaders = [
  ReactElement<HeaderProps>,
  ReactElement<HeaderActionProps>
];
export type WidgetProps = {
  children: ThreeChildren | BothHeaders | ReactElement<HeaderProps>;
} & Partial<ContextProps>;

import { FC } from "react";

// TODO: use ThemeProvider instead
import "@avaya/neo/neo/dist/css/neo/neo.min.css";

export const Wrapper: FC = ({ children }) => {
  return <>{children}</>;
};

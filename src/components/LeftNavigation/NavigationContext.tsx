import { createContext } from "react";

import { LeftNavProps, NavigationContextType } from "./LeftNavigationTypes";

export const NavigationContext = createContext<NavigationContextType>({
  currentUrl: "",
  onSelectedLink: () => {},
});

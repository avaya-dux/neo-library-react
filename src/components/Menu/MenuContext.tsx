import { createContext } from "react";
import { MenuContextType } from "./MenuTypes";

export const MenuContext = createContext<MenuContextType>({
  closeOnBlur: true,
  closeOnSelect: true,
  openOnHover: false,
  onMenuClose: () => {},

  setRootMenuOpen: () => {},
});

import { createContext } from "react";

import { IFilterContext } from "../types";

export const FilterContext = createContext<IFilterContext>({
  allowColumnFilter: false,
  filterSheetVisible: false,
  setFilterSheetVisible: () => {},
  toggleFilterSheetVisible: () => {},
});

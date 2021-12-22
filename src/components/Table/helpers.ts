import { AriaAttributes } from "react";

export const calculateAriaSortValue = (
  isSorted: boolean,
  sortedDir?: "descending" | "ascending"
): AriaAttributes["aria-sort"] => {
  let result: AriaAttributes["aria-sort"] = "none";

  if (isSorted && sortedDir === "descending") {
    result = "descending";
  } else if (isSorted && sortedDir === "ascending") {
    result = "ascending";
  } else if (isSorted) {
    result = "other";
  }

  return result;
};

export const convertRowIdsArrayToObject = (rowIds: string[]) => {
  const result: Record<string, boolean> = {};
  rowIds.forEach((rowId) => {
    result[rowId] = true;
  });

  return result;
};

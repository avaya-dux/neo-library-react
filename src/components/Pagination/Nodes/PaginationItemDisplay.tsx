import { useMemo } from "react";

import { Tooltip } from "components";

import { PaginationProps } from "..";

/**
 * Displays the currently selected item(s) out of the total number of items.
 * Ie, "1 / 10" for `itemDisplayType="page"`
 * or "1 - 10 / 100" for `itemDisplayType="count"`
 *
 * @example
 * <PaginationItemDisplay
 *  ariaLabelForCurrentPage={"Page Count"}
 *  currentPageIndex={3}
 *  itemCount={50}
 *  itemDisplayType="count"
 *  itemsPerPage={5}
 *  totalPages={10}
 * />
 */
export const PaginationItemDisplay = ({
  ariaLabelForCurrentPage = "Page count",
  currentPageIndex,
  itemCount,
  itemDisplayType = "count",
  itemsPerPage,
  totalPages,
}: { totalPages: number } & Pick<
  PaginationProps,
  | "ariaLabelForCurrentPage"
  | "currentPageIndex"
  | "itemCount"
  | "itemsPerPage"
  | "itemDisplayType"
>) => {
  const display = useMemo(() => {
    if (itemDisplayType === "count") {
      const startingItemIndex = (currentPageIndex - 1) * itemsPerPage + 1;
      const endingItemIndex = Math.min(
        startingItemIndex + itemsPerPage - 1,
        itemCount
      );

      return `${startingItemIndex}-${endingItemIndex} / ${itemCount}`;
    } else if (itemDisplayType === "page") {
      return `${currentPageIndex} / ${totalPages}`;
    }

    return <></>;
  }, [currentPageIndex, itemCount, itemDisplayType, itemsPerPage, totalPages]);

  return <Tooltip label={ariaLabelForCurrentPage}>{display}</Tooltip>;
};

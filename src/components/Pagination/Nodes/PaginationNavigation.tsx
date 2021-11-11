import { useMemo } from "react";

import { IconButton } from "components";

import { PaginationNavigationProps } from "../PaginationTypes";
import { buildNavItems, calculateMaxNavNodes } from "./helpers";

/**
 * Used to render the individual links that are displayed in
 * the Pagination component for the purpose of navigating to
 * individual "pages". This includes the "left" and "right"
 * arrows, and the "1", "2", "3", etc. links.
 *
 * @example
 * <PaginationNavigation
 *  backIconButtonText={backIconButtonText}
 *  nextIconButtonText={nextIconButtonText}
 *  currentPageIndex={currentPageIndex}
 *  totalPages={totalPages}
 *  onPageChange={onPageChange}
 *  paginationRootWidth={rootWidth}
 * />
 */
export const PaginationNavigation = ({
  backIconButtonText = "previous", // TODO: localize
  nextIconButtonText = "next", // TODO: localize
  currentPageIndex,
  totalPages,
  onPageChange,
  paginationRootWidth,
}: PaginationNavigationProps) => {
  const navListItems = useMemo(() => {
    const maxNavNodes = calculateMaxNavNodes(paginationRootWidth);

    return buildNavItems(
      currentPageIndex,
      maxNavNodes,
      onPageChange,
      totalPages
    );
  }, [currentPageIndex, totalPages, paginationRootWidth]);

  return (
    <nav className="neo-pagination" role="navigation" aria-label="pagination">
      <IconButton
        aria-label={backIconButtonText}
        disabled={currentPageIndex <= 1}
        icon="arrow-left"
        shape="square"
        variant="tertiary"
        onClick={(e) => onPageChange(e, currentPageIndex - 1)}
      />

      <ul className="neo-pagination__list">{navListItems}</ul>

      <IconButton
        aria-label={nextIconButtonText}
        disabled={currentPageIndex >= totalPages}
        icon="arrow-right"
        shape="square"
        variant="tertiary"
        onClick={(e) => onPageChange(e, currentPageIndex + 1)}
      />
    </nav>
  );
};

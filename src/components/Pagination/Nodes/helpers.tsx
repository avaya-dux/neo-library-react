import { PaginationProps } from "../PaginationTypes";
import { NavListItemButton } from "./NavListItemButton";

/**
 * This function calculates the number of pages that can be shown in the
 * pagination navigation and returns an array of nav nodes. It assumes
 * that there at minimum four nodes available; due to `PaginationNavigation`
 * handling the 0-3 nodes use-cases already.
 *
 * @param currentPageIndex the currently viewed page
 * @param maxNavNodes the maximum number of nodes we can return
 * @param onPageChange the method that must be called when a nav node is clicked
 * @param totalPages the total number of pages
 *
 * @returns an array of nav nodes
 */
export const buildNavItems = (
  currentPageIndex: number,
  maxNavNodes: number,
  onPageChange: PaginationProps["onPageChange"],
  totalPages: number
) => {
  const result = [];

  if (totalPages === 1 || maxNavNodes >= totalPages) {
    for (let i = 1; i <= totalPages; i++) {
      result.push(
        <NavListItemButton
          isCurrentPage={i === currentPageIndex}
          key={i}
          onPageChange={onPageChange}
          pageToNavigateTo={i}
        />
      );
    }
  } else {
    // TODO-565: improve logic for better UX. `1 ... 2 ... 100` -> `1 2 ... 100` and likewise for the "99" case.
    result.push(
      <NavListItemButton
        isCurrentPage={currentPageIndex === 1}
        key={1}
        onPageChange={onPageChange}
        pageToNavigateTo={1}
      />
    );
    result.push(
      <li key="nav-dots-left">
        <span className="neo-pagination__dots">&hellip;</span>
      </li>
    );
    if (currentPageIndex !== 1 && currentPageIndex !== totalPages) {
      result.push(
        <NavListItemButton
          isCurrentPage
          key={currentPageIndex}
          onPageChange={onPageChange}
          pageToNavigateTo={currentPageIndex}
        />
      );
      result.push(
        <li key="nav-dots-right">
          <span className="neo-pagination__dots">&hellip;</span>
        </li>
      );
    }
    result.push(
      <NavListItemButton
        isCurrentPage={totalPages === currentPageIndex}
        key={totalPages}
        onPageChange={onPageChange}
        pageToNavigateTo={totalPages}
      />
    );
  }

  return result;
};

/**
 * @param paginationRootWidth the width of the pagination root element
 *
 * @returns a number that represents how many nodes can fit on the screen
 */
export const calculateMaxNavNodes = (paginationRootWidth: number) => {
  const leftNodeWidth = 40;
  const rightNodeWidth = 40;
  const arrowWidth = 40;
  const navItemWidth = 50;

  const unavailableWidth = leftNodeWidth + rightNodeWidth + arrowWidth * 2;
  const availableWidth = paginationRootWidth - unavailableWidth;
  const availableNodes = Math.floor(availableWidth / navItemWidth);

  return availableNodes;
};

import { useLayoutEffect, useRef, useState } from "react";

import {
  PaginationItemDisplay,
  PaginationItemsPerPageSelection,
  PaginationNavigation,
} from "./Nodes/";
import { PaginationProps } from "./PaginationTypes";

// TODO-565: re-calculate on window size change

/**
 * This component is used to render pagination.
 * It can be used as a standalone component.
 * Is also used by the Table component.
 * It is up to the implementer to provide the correct data,
 * Eg, `currentPageIndex`, `itemsPerPage`, ect.
 *
 * @example
 * <Pagination
    currentPageIndex={pageIndex}
    itemCount={itemArray.length}
    itemsPerPage={itemsPerPage}
    itemsPerPageOptions={[1, 5, 10]}
    onPageChange={(e, newIndex) => {
      e?.preventDefault();
      setPageIndex(newIndex);
    }}
    onItemsPerPageChange={(e, newItemsPerPage) => {
      e?.preventDefault();
      setItemsPerPage(newItemsPerPage);
    }}
 * />
 *
 * @see https://design.avayacloud.com/components/web/tables-web
 */
export const Pagination = ({
  id = "pagination",

  currentPageIndex,
  itemCount,
  itemsPerPage,
  itemsPerPageOptions,

  itemDisplayType,

  onPageChange,
  onItemsPerPageChange,

  // translations
  backIconButtonText,
  nextIconButtonText,
  ariaLabelForCurrentPage,
  ariaLabelForShownPagesSelect,

  // default overrides
  centerNode,
  leftNode,
  rightNode,
}: PaginationProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const totalPages = Math.ceil(itemCount / itemsPerPage);

  const [rootWidth, setRootWidth] = useState(0);
  useLayoutEffect(() => {
    if (rootRef.current) {
      setRootWidth(rootRef.current.offsetWidth);
    }
  }, [rootRef]);

  return (
    <div className="neo-pagination__row" id={id} ref={rootRef}>
      {leftNode || (
        <PaginationItemDisplay
          ariaLabelForCurrentPage={ariaLabelForCurrentPage}
          currentPageIndex={currentPageIndex}
          itemCount={itemCount}
          itemDisplayType={itemDisplayType}
          itemsPerPage={itemsPerPage}
          totalPages={totalPages}
        />
      )}

      {centerNode || (
        <PaginationNavigation
          backIconButtonText={backIconButtonText}
          nextIconButtonText={nextIconButtonText}
          currentPageIndex={currentPageIndex}
          totalPages={totalPages}
          onPageChange={onPageChange}
          paginationRootWidth={rootWidth}
        />
      )}

      {rightNode || (
        <PaginationItemsPerPageSelection
          ariaLabelForShownPagesSelect={ariaLabelForShownPagesSelect}
          itemsPerPage={itemsPerPage}
          itemsPerPageOptions={itemsPerPageOptions}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      )}
    </div>
  );
};

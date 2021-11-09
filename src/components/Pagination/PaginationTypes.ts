interface PaginationTranslations {
  backIconButtonText?: string;
  nextIconButtonText?: string;
  ariaLabelForCurrentPage?: string;
  ariaLabelForShownPagesSelect?: string;
}

export type PaginationProps = {
  id?: string;

  currentPageIndex: number;
  itemCount: number;
  itemsPerPage: number;
  itemsPerPageOptions?: number[];

  itemDisplayType?: "count" | "page" | "none";

  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    pageIndex: number
  ) => void;
  onItemsPerPageChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    itemsPerPage: number
  ) => void;

  // table overrides
  centerNode?: React.ReactNode;
  leftNode?: React.ReactNode;
  rightNode?: React.ReactNode;
} & PaginationTranslations;

export type PaginationNavigationProps = {
  totalPages: number;
  paginationRootWidth: number;
} & Pick<PaginationTranslations, "backIconButtonText" | "nextIconButtonText"> &
  Pick<PaginationProps, "currentPageIndex" | "onPageChange">;

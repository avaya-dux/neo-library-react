export interface IToolbarTranslations {
  filter?: string;
  noDataAvailable?: string;
  refresh?: string;
  rowsPerPage?: string;
  searchInputPlaceholder?: string;
}

export interface IBodyTranslations {
  noDataAvailable?: string;
}

export interface IPaginationTranslations {
  backIconButtonText?: string;
  itemsPerPageLabel?: string;
  nextIconButtonText?: string;
  tooltipForCurrentPage?: string;
  tooltipForShownPagesSelect?: string;
}

export interface ITableHeaderTranslations {
  selectAll: string;
  sortBy: string;
}

export interface ITableTranslations {
  toolbar: IToolbarTranslations;
  header: ITableHeaderTranslations;
  body: IBodyTranslations;
  pagination: IPaginationTranslations;
}

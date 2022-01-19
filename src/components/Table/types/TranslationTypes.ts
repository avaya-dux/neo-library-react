export interface ITableFilterTranslations {
  clear?: string;
  close?: string;
  filter?: string;
  filterBy?: string;
}
export interface IToolbarTranslations extends ITableFilterTranslations {
  create?: string;
  delete?: string;
  edit?: string;
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

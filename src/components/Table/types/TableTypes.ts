import { TableInstance, TableOptions } from "react-table";

import {
  IBodyTranslations,
  IPaginationTranslations,
  ITableHeaderTranslations,
  ITableTranslations,
  IToolbarTranslations,
} from ".";

interface ToolbarSharedProps {
  handleCreate?: () => Promise<void> | void;
  handleRefresh?: () => Promise<void> | void;
  readonly?: boolean;
  selectableRows?: "none" | "single" | "multiple";
}
export type TableToolbarProps<T extends Record<string, any>> = {
  instance: TableInstance<T>;
  translations: IToolbarTranslations;
} & ToolbarSharedProps;

export interface TableHeaderProps<T extends Record<string, any>> {
  instance: TableInstance<T>;
  selectableRows: "none" | "single" | "multiple";
  translations?: ITableHeaderTranslations;
}

export type PaginationProps<T extends Record<string, any>> = {
  instance: TableInstance<T>;
  translations: IPaginationTranslations;
};

export type TableBodyProps<T extends Record<string, any>> = {
  handleRowSelected?: (row: T, selectedRowIds: string[]) => void; // TODO-567: not sure I like the `selectedRowIds` param
  instance: TableInstance<T>;
  selectableRows: "none" | "single" | "multiple";
  translations: IBodyTranslations;
};

export type TableProps<T extends Record<string, any>> = {
  caption?: string;
  id?: string;
  itemsPerPageOptions?: number[];
  defaultSelectedRowIds?: string[];
  summary?: string;
  containerClassName?: string;
  translations?: ITableTranslations;
} & ToolbarSharedProps &
  TableOptions<T> &
  Pick<TableBodyProps<T>, "handleRowSelected">;

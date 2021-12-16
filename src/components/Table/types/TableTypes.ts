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

interface TableHeaderBodySharedProps<T extends Record<string, any>> {
  handleRowToggled?: (selectedRowIds: string[], row?: T) => void;
  instance: TableInstance<T>;
  selectableRows: "none" | "single" | "multiple";
}

export type TableHeaderProps<T extends Record<string, any>> = {
  translations: ITableHeaderTranslations;
} & TableHeaderBodySharedProps<T>;

export type TableBodyProps<T extends Record<string, any>> = {
  translations: IBodyTranslations;
} & TableHeaderBodySharedProps<T>;

export type TableProps<T extends Record<string, any>> = {
  caption?: string;
  id?: string;
  itemsPerPageOptions?: number[];
  defaultSelectedRowIds?: string[] | number[];
  summary?: string;
  containerClassName?: string;
  translations?: ITableTranslations;
} & ToolbarSharedProps &
  TableOptions<T> &
  Pick<TableBodyProps<T>, "handleRowToggled">;

export type PaginationProps<T extends Record<string, any>> = {
  instance: TableInstance<T>;
  translations: IPaginationTranslations;
};

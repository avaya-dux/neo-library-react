import { TableInstance, TableOptions } from "react-table";

interface ToolbarSharedProps {
  handleCreate?: () => Promise<void> | void;
  handleRefresh: () => Promise<void> | void;
  readonly?: boolean;
  selectableRows?: "none" | "single" | "multiple";
}
export type TableToolbarProps<T extends Record<string, any>> = {
  instance: TableInstance<T>;
} & ToolbarSharedProps;

export type TableBodyProps<T extends Record<string, any>> = {
  handleRowSelected?: (row: T | null) => void;
  instance: TableInstance<T>;
  selectableRows: "none" | "single" | "multiple";
};

export type TableProps<T extends Record<string, any>> = {
  caption?: string;
  id?: string;
  preSelectedRowIds?: string[];
  itemsPerPageOptions?: number[];
} & ToolbarSharedProps &
  TableOptions<T> &
  Pick<TableBodyProps<T>, "handleRowSelected">;

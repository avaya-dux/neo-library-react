import { Column } from "react-table";

import { translations } from "./default-data";
import { TableProps } from "./types";

export interface IDataTableMockData {
  id: string;
  label: string;
  name: string | JSX.Element;
  other: string;
}

const columnsExample: Array<Column<IDataTableMockData>> = [
  {
    Header: "name header",
    accessor: "name",
    width: 100,
  },
  {
    Header: "other header",
    accessor: "other",
  },
];
const dataExample: IDataTableMockData[] = [
  { id: "10", label: "Fred", name: "sir Fred", other: "Lorem Ipsum" },
  { id: "20", label: "Daniel", name: "sir Daniel", other: "Lorem Ipsum" },
  { id: "30", label: "Tif", name: "madam Tif", other: "Lorem Ipsum" },
  { id: "40", label: "Hailey", name: "madam Hailey", other: "Lorem Ipsum" },
  { id: "50", label: "Alex", name: "intersex Alex", other: "Lorem Ipsum" },
  {
    id: "60",
    label: "Skyler",
    name: "androgynous Skyler",
    other: "Lorem Ipsum",
  },
  {
    id: "70",
    label: "Frank",
    name: <a href="#frank">fancy Frank</a>,
    other: "Lorem Ipsum",
  },
];

export const FilledFields: TableProps<IDataTableMockData> = {
  columns: columnsExample,
  data: dataExample,
  caption: "table caption",
  summary: "table summary",
  itemsPerPageOptions: [1, 2, 5, 10, 20, 50, 100],

  handleCreate: () => {},
  handleRefresh: () => {},
  handleRowToggled: () => {},
  readonly: false,
  translations,
};

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
    Header: "Name Header",
    accessor: "name",
    width: 100,
  },
  {
    Header: "Other Header",
    accessor: "other",
  },
];
const dataExample: IDataTableMockData[] = [
  { id: "10", label: "Fred", name: "Sir Fred", other: "Lorem Ipsum" },
  { id: "20", label: "Daniel", name: "Sir Daniel", other: "Lorem Ipsum" },
  { id: "30", label: "Tif", name: "Madam Tif", other: "Lorem Ipsum" },
  { id: "40", label: "Hailey", name: "Madam Hailey", other: "Lorem Ipsum" },
  { id: "50", label: "Alex", name: "Intersex Alex", other: "Lorem Ipsum" },
  {
    id: "60",
    label: "Skyler",
    name: "Androgynous Skyler",
    other: "Lorem Ipsum",
  },
  {
    id: "70",
    label: "Frank",
    name: <a href="#frank">Fancy Frank</a>,
    other: "Lorem Ipsum",
  },
];

export const FilledFields: TableProps<IDataTableMockData> = {
  caption: "table caption",
  columns: columnsExample,
  data: dataExample,
  itemsPerPageOptions: [1, 2, 5, 10, 20, 50, 100],
  readonly: false,
  summary: "table summary",
  translations,
};

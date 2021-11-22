import { Column } from "react-table";
import { TableProps } from "./TableTypes";

export interface IDataTableMockData {
  id: number;
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
  { id: 1, name: "sir Fred", other: "Lorem Ipsum" },
  { id: 2, name: "sir Daniel", other: "Lorem Ipsum" },
  { id: 3, name: "madam Tif", other: "Lorem Ipsum" },
  { id: 4, name: "madam Hailey", other: "Lorem Ipsum" },
  { id: 5, name: "intersex Alex", other: "Lorem Ipsum" },
  { id: 6, name: "androgynous Skyler", other: "Lorem Ipsum" },
  { id: 7, name: <a href="#frank">fancy Frank</a>, other: "Lorem Ipsum" },
];

export const FilledFields: TableProps<IDataTableMockData> = {
  columns: columnsExample,
  data: dataExample,
  itemsPerPageOptions: [1, 2, 5, 10, 20, 50, 100],

  handleCreate: () => {},
  handleRefresh: () => {},
  handleRowSelected: () => {},
  readonly: false,
};

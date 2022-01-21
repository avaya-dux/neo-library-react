import { useMemo } from "react";
import { Column } from "react-table";

import { IconChip } from "components/Chip";
import { SelectNative } from "components/SelectNative";
import { IconNamesType } from "utils";

import { translations } from "./default-data";
import { TableProps } from "./types";

export interface IDataTableMockData {
  id: string;
  label: string;
  name: string | JSX.Element;
  other: string;
  date: Date;
  status: "active" | "inactive" | "awc" | "in call";
  hexValue: string;
}

const columnsExample: Array<Column<IDataTableMockData>> = [
  {
    Header: "Name",
    accessor: "name",
    disableFilters: true,
    maxWidth: 200,
  },
  {
    Header: "Color",
    accessor: "hexValue",
    disableFilters: true,
    sortType: "alphanumeric",
  },
  {
    Header: "Other",
    accessor: "other",
    disableFilters: true,
    disableSortBy: true,
  },
  {
    Cell: ({ value }) => <span>{value.toLocaleDateString()}</span>,
    Header: "Date",
    accessor: "date",
    disableFilters: true,
    sortType: "datetime",
  },
  {
    Cell: ({ value }) => {
      let icon: IconNamesType = "add-circle";

      switch (value) {
        case "active":
          icon = "check";
          break;
        case "inactive":
          icon = "close";
          break;
        case "awc":
          icon = "away";
          break;
        case "in call":
          icon = "agents";
          break;
        default:
          icon = "queue";
          break;
      }

      return <IconChip icon={icon} text={value.toUpperCase()} />;
    },
    Filter: ({ column: { setFilter, preFilteredRows, id } }) => {
      const options = useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
          options.add(row.values[id]);
        });
        return Array.from(options.values());
      }, [id, preFilteredRows]);

      return (
        <SelectNative
          label="Status"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setFilter(e.target.value || undefined);
          }}
        >
          <option value="">All</option>

          {options.map((option, i) => (
            <option key={i} value={option as string}>
              {option as string}
            </option>
          ))}
        </SelectNative>
      );
    },
    Header: "Status",
    accessor: "status",
    disableSortBy: true,
  },
];
const dataExample: IDataTableMockData[] = [
  {
    id: "10",
    label: "Fred",
    name: "Sir Fred",
    other: "Lorem Ipsum",
    date: new Date(2001, 1, 1),
    status: "active",
    hexValue: "FF0000",
  },
  {
    id: "20",
    label: "Daniel",
    name: "Sir Daniel",
    other: "Delor Itum",
    date: new Date(2000, 2, 1),
    status: "inactive",
    hexValue: "00FF00",
  },
  {
    id: "30",
    label: "Tif",
    name: "Madam Tif",
    other: "Asdf Fded",
    date: new Date(2010, 2, 12),
    status: "in call",
    hexValue: "0000FF",
  },
  {
    id: "40",
    label: "Hailey",
    name: "Madam Hailey",
    other: "Consectetur Adipiscing",
    date: new Date(2020, 1, 21),
    status: "awc",
    hexValue: "FFFF00",
  },
  {
    id: "50",
    label: "Alex",
    name: "Intersex Alex",
    other: "Duis aute",
    date: new Date(2000, 2, 11),
    status: "awc",
    hexValue: "FF00FF",
  },
  {
    id: "60",
    label: "Skyler",
    name: "Androgynous Skyler",
    other: "Excepteur sint",
    date: new Date(2000, 2, 26),
    status: "in call",
    hexValue: "00FFFF",
  },
  {
    id: "70",
    label: "Frank",
    name: <a href="#frank">Fancy Frank</a>,
    other: "Nulla pariatur",
    date: new Date(2000, 3, 11),
    status: "awc",
    hexValue: "FF0000",
  },
  {
    id: "70",
    label: "Frank",
    name: <a href="#frank">Fancy Frank</a>,
    other: "Nulla pariatur",
    date: new Date(2000, 3, 11),
    status: "awc",
    hexValue: "FF0000",
  },
  {
    id: "80",
    label: "Scott",
    name: <a href="#scott">Fancy Frank</a>,
    other: "Etora platurude",
    date: new Date(2000, 3, 15),
    status: "active",
    hexValue: "AA0000",
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

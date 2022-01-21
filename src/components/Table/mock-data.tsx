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
}

const columnsExample: Array<Column<IDataTableMockData>> = [
  {
    Header: "Name",
    accessor: "name",
    disableFilters: true,
    width: 100,
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
  },
  {
    id: "20",
    label: "Daniel",
    name: "Sir Daniel",
    other: "Delor Itum",
    date: new Date(2000, 2, 1),
    status: "inactive",
  },
  {
    id: "30",
    label: "Tif",
    name: "Madam Tif",
    other: "Asdf Fded",
    date: new Date(2010, 2, 12),
    status: "in call",
  },
  {
    id: "40",
    label: "Hailey",
    name: "Madam Hailey",
    other: "Consectetur Adipiscing",
    date: new Date(2020, 1, 21),
    status: "awc",
  },
  {
    id: "50",
    label: "Alex",
    name: "Intersex Alex",
    other: "Duis aute",
    date: new Date(2000, 2, 11),
    status: "awc",
  },
  {
    id: "60",
    label: "Skyler",
    name: "Androgynous Skyler",
    other: "Excepteur sint",
    date: new Date(2000, 2, 26),
    status: "in call",
  },
  {
    id: "70",
    label: "Frank",
    name: <a href="#frank">Fancy Frank</a>,
    other: "Nulla pariatur",
    date: new Date(2000, 3, 11),
    status: "awc",
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

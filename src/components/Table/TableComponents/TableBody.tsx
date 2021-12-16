import { Row } from "react-table";

import { Checkbox } from "components/CheckboxGroup";

import { TableBodyProps } from "../types";

/**
 * TableBody is used by the Table component to render the table body (<tr>s and <td>s)
 *
 * @example
 * <TableBody
 *  instance={instance}
 *  handleRowToggled={(selectedRowIds, toggledRow) => { ... }}
 *  selectableRows={selectableRows}
 * />
 */
export const TableBody = <T extends Record<string, any>>({
  handleRowToggled = (_1: string[], _2?: T) => {},
  instance,
  selectableRows,
  translations,
}: TableBodyProps<T>) => {
  const {
    getTableBodyProps,
    headers,
    page,
    prepareRow,
    toggleRowSelected,
    toggleAllRowsSelected,
    state: { selectedRowIds },
  } = instance;

  const handleRowToggledInternal = (row: Row<T>) => {
    const previouslySelectedRows = Object.keys(selectedRowIds);
    const userIsDeselectingRow = Object.keys(selectedRowIds).includes(row.id);
    const newlySelectedRowIds = userIsDeselectingRow
      ? previouslySelectedRows.filter((id) => id !== row.id)
      : [...previouslySelectedRows, row.id];

    if (selectableRows === "single") {
      toggleAllRowsSelected(false); // set all rows `selected = false`
    }

    if (selectableRows !== "none") {
      toggleRowSelected(row.id);

      if (handleRowToggled) {
        handleRowToggled(newlySelectedRowIds, row.original);
      }
    }
  };

  const shouldShowCheckbox = selectableRows !== "none";

  return (
    <tbody {...getTableBodyProps()}>
      {page.length === 0 ? (
        <tr>
          <td colSpan={headers.length}>{translations.noDataAvailable}</td>
        </tr>
      ) : (
        page.map((row) => {
          prepareRow(row);

          return (
            <tr
              className={row.isSelected ? "active" : ""}
              {...row.getRowProps()}
            >
              {shouldShowCheckbox && (
                <td style={{ padding: "0 0 0 5px" }}>
                  <Checkbox
                    label="" // BUG: need an aria-label maybe? but certainly not a `label` here
                    checked={row.isSelected}
                    onChange={() => handleRowToggledInternal(row)}
                    value={row.id}
                  />
                </td>
              )}

              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })
      )}
    </tbody>
  );
};

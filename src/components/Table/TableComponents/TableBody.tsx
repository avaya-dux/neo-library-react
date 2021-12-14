import { Checkbox } from "components/CheckboxGroup";

import { TableBodyProps } from "../types";

/**
 * TableBody is used by the Table component to render the table body (<tr>s and <td>s)
 *
 * @example
 * <TableBody
 *  instance={instance}
 *  handleRowSelected={handleRowSelected}
 *  selectableRows={selectableRows}
 * />
 */
export const TableBody = <T extends Record<string, any>>({
  handleRowSelected = (_1: T, _2: string[]) => {},
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

          const handleRowSelectedInternal = () => {
            const selectedRows = Object.keys(selectedRowIds);

            if (selectableRows === "single") {
              toggleAllRowsSelected(false); // set all rows `selected = false`

              const userIsDeselectingRow = Object.keys(selectedRowIds).includes(
                row.id
              );

              if (userIsDeselectingRow) {
                handleRowSelected({} as T, selectedRows);
                return;
              }
            }
            if (selectableRows !== "none") {
              toggleRowSelected(row.id);

              handleRowSelected(row.original, selectedRows);
            }
          };

          // BUG-567: can't unselect
          const rowIsSelected =
            row.isSelected || selectedRowIds[row.original.id] === true;

          return (
            <tr
              className={rowIsSelected ? "active" : ""}
              {...row.getRowProps()}
            >
              {shouldShowCheckbox && (
                <td style={{ padding: "0 0 0 5px" }}>
                  <Checkbox
                    label="" // BUG: need an aria-label maybe? but certainly not a `label` here
                    checked={rowIsSelected}
                    onChange={handleRowSelectedInternal}
                    value={row.original.id}
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

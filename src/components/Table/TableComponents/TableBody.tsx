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
              onClick={() => {
                const selectedRows = Object.keys(selectedRowIds);

                if (selectableRows === "single") {
                  toggleAllRowsSelected(false); // set all rows `selected = false`

                  const userIsDeselectingRow = Object.keys(
                    selectedRowIds
                  ).includes(row.id);

                  if (userIsDeselectingRow) {
                    handleRowSelected({} as T, selectedRows);
                    return;
                  }
                }
                if (selectableRows !== "none") {
                  toggleRowSelected(row.id);

                  handleRowSelected(row.original, selectedRows);
                }
              }}
            >
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })
      )}
    </tbody>
  );
};

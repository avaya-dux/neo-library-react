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

          // TODO-567: gotta add row checkmark inputs and NOT allow the click of the full row
          // optionally gotta add a header checkmark if `selectableRows === 'multiple'`
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

          return (
            <tr
              className={row.isSelected ? "active" : ""}
              {...row.getRowProps()}
              onClick={handleRowSelectedInternal}
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

import { TableBodyProps } from "../TableTypes";

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
  instance,
}: TableBodyProps<T>) => {
  const { getTableBodyProps, headers, page, prepareRow } = instance;

  return (
    <tbody {...getTableBodyProps()}>
      {page.length === 0 ? (
        <tr>
          <td colSpan={headers.length}>No data {/** TODO-567: translate */}</td>
        </tr>
      ) : (
        page.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
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

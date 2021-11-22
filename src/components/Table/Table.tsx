import { usePagination, useTable } from "react-table";

import { Pagination } from "components/Pagination";

import { TableProps } from ".";
import { TableBody } from "./TableComponents";

/**
 * The Table is used to organize and display data within rows and columns.
 * It comes with built in pagination.
 *
 * @example
  const columns = [
    {
      Header: "name header",
      accessor: "name",
    },
    {
      Header: "other header",
      accessor: "other",
    },
  ];
  const [data, setData] = useState([
    { id: 1, name: "sir Fred", other: "Lorem Ipsum" },
    { id: 2, name: "sir Daniel", other: "Lorem Ipsum" },
    { id: 3, name: "madam Tif", other: "Lorem Ipsum" },
    { id: 4, name: "madam Hailey", other: "Lorem Ipsum" },
    { id: 5, name: "intersex Alex", other: "Lorem Ipsum" },
    { id: 6, name: "androgynous Skyler", other: "Lorem Ipsum" },
    { id: 7, name: <a href="#frank">fancy Frank</a>, other: "Lorem Ipsum" },
  ]);

  return (<Table
    columns={columns}
    data={data}
    handleRefresh={() => {
      callApi().then(data => setData(data));
    }}
  />);
 *
 * @see https://design.avayacloud.com/components/web/tables-web
 */
export const Table = <T extends Record<string, any>>({
  id,
  data,
  columns,
  caption,
  itemsPerPageOptions,

  handleRowSelected = () => {},
  readonly = false,
  selectableRows = "none",

  ...rest
}: TableProps<T>) => {
  const instance = useTable<T>(
    {
      columns,
      data,
      initialState: { pageSize: itemsPerPageOptions?.[0] || 10 },

      ...rest,
    },
    usePagination
  );

  const {
    rows,
    getTableProps,
    headers,
    state: { pageIndex, pageSize },
    gotoPage,
    setPageSize,
  } = instance;
  const rowCount = rows.length;

  return (
    <div id={id} data-testid={id}>
      {/* <div>TODO-567: toolbar</div> */}

      <table {...getTableProps()} className="neo-table">
        {caption && <caption>{caption}</caption>}

        {rows.length > 0 && (
          <thead>
            <tr>
              {headers.map((column) => (
                <th {...column.getHeaderProps()} scope="col">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          </thead>
        )}

        <TableBody
          instance={instance}
          handleRowSelected={handleRowSelected}
          selectableRows={selectableRows}
        />
      </table>

      {rows.length > 0 && (
        <Pagination
          currentPageIndex={pageIndex + 1} // TODO-567: may want to go and update Pagination.tsx to be zero-based
          itemCount={rowCount}
          itemsPerPage={pageSize}
          itemsPerPageOptions={itemsPerPageOptions}
          onPageChange={(e, newIndex) => {
            e?.preventDefault();
            gotoPage(newIndex - 1); // TODO-567: may want to go and update Pagination.tsx to be zero-based
          }}
          onItemsPerPageChange={(e, newItemsPerPage) => {
            e?.preventDefault();
            setPageSize(newItemsPerPage);
          }}
        />
      )}
    </div>
  );
};

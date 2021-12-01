import { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

import { Pagination } from "components/Pagination";

import { TableProps } from ".";
import { translations as defaultTranslations } from "./default-data";
import { TableBody, TableHeader, TableToolbar } from "./TableComponents";

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
  summary,
  itemsPerPageOptions,

  containerClassName = "",
  // handleCreate, // TODO-567: implement
  handleRefresh,
  handleRowSelected = () => {}, // TODO-567: implement
  readonly = false,
  selectableRows = "none",
  translations,

  ...rest
}: TableProps<T>) => {
  const instance = useTable<T>(
    {
      columns,
      data,
      initialState: { pageSize: itemsPerPageOptions?.[0] || 10 },

      ...rest,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    rows,
    getTableProps,
    state: { pageIndex, pageSize },
    gotoPage,
    setPageSize,
  } = instance;
  const rowCount = rows.length;

  const tableCaptionId = useMemo(
    () => `table-caption-${caption || "caption"}`,
    [caption]
  );
  const tableSummaryId = useMemo(
    () => `table-summary-${caption || "summary"}`,
    [caption]
  );

  const toolbarTranslations = useMemo(() => {
    return {
      ...defaultTranslations.toolbar,
      ...translations?.toolbar,
    };
  }, [translations]);

  const headerTranslations = useMemo(() => {
    return {
      ...defaultTranslations.header,
      ...translations?.header,
    };
  }, [translations]);

  const bodyTranslations = useMemo(() => {
    return {
      ...defaultTranslations.body,
      ...translations?.body,
    };
  }, [translations]);

  const paginationTranslations = useMemo(() => {
    return {
      ...defaultTranslations.pagination,
      ...translations?.pagination,
    };
  }, [translations]);

  return (
    <div id={id} data-testid={id} className={containerClassName}>
      {(caption || summary) && (
        <>
          {caption && <h4 id={tableCaptionId}>{caption}</h4>}
          {summary && <p id={tableSummaryId}>{summary}</p>}
        </>
      )}

      <TableToolbar
        handleRefresh={handleRefresh}
        instance={instance}
        readonly={readonly}
        translations={toolbarTranslations}
      />

      <table
        {...getTableProps()}
        className="neo-table"
        aria-labelledby={tableCaptionId}
        aria-describedby={tableSummaryId}
      >
        <TableHeader instance={instance} translations={headerTranslations} />

        <TableBody
          instance={instance}
          handleRowSelected={handleRowSelected}
          selectableRows={selectableRows}
          translations={bodyTranslations}
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
          backIconButtonText={paginationTranslations.backIconButtonText}
          itemsPerPageLabel={paginationTranslations.itemsPerPageLabel}
          nextIconButtonText={paginationTranslations.nextIconButtonText}
          tooltipForCurrentPage={paginationTranslations.tooltipForCurrentPage}
          tooltipForShownPagesSelect={
            paginationTranslations.tooltipForShownPagesSelect
          }
        />
      )}
    </div>
  );
};

import { AriaAttributes } from "react";

import { Checkbox } from "components/CheckboxGroup";
import { Keys } from "utils";

import { TableHeaderProps } from "../types";

/**
 * TableHeader is used by the Table component to render the `<thead>` table content
 *
 * @example
 * <TableHeader
 *  instance={instance}
 *  translations={translations}
 * />
 */
export const TableHeader = <T extends Record<string, any>>({
  instance,
  selectableRows,
  translations,
}: TableHeaderProps<T>) => {
  const {
    headers,
    page,
    toggleAllRowsSelected,
    state: { selectedRowIds },
  } = instance;

  const selectedRows = Object.keys(selectedRowIds);
  const allRowsAreSelected = selectedRows.length === page.length;
  const shouldHaveCheckboxColumn = selectableRows !== "none";
  const shouldHaveCheckbox = selectableRows === "multiple";
  const checkboxCheckedValue = allRowsAreSelected
    ? true
    : selectedRows.length === 0
    ? false
    : "indeterminate";

  return (
    <thead>
      <tr>
        {shouldHaveCheckboxColumn && (
          <th style={{ padding: "0 0 0 5px", width: 30 }}>
            {shouldHaveCheckbox && (
              <Checkbox
                label="" // BUG: need an aria-label maybe? but certainly not a `label` here
                checked={checkboxCheckedValue}
                onChange={() => {
                  toggleAllRowsSelected();

                  // TODO-567:need this!
                  // handleRowSelected(row.original, selectedRows);
                }}
                value={""}
              />
            )}
          </th>
        )}
        {headers.map((column) => {
          const {
            canSort,
            getHeaderProps,
            getSortByToggleProps,
            isSorted,
            isSortedDesc,
            render,
          } = column;

          const sortedDir = isSortedDesc ? "descending" : "ascending";
          const ariasort = calculateAriaSortValue(isSorted, sortedDir);
          const thDivProps = getSortByToggleProps({
            title: translations?.sortBy,
          });

          return (
            <th {...getHeaderProps()} scope="col" aria-sort={ariasort}>
              {canSort ? (
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    switch (e.key) {
                      case Keys.ENTER:
                      case Keys.SPACE:
                      case Keys.DOWN:
                        (thDivProps as any).onClick(e); // BUG: can't figure out the proper typing of thDivProps
                        break;
                    }
                  }}
                  {...thDivProps}
                >
                  {render("Header")}

                  {isSorted && (
                    <span
                      className={
                        ariasort === "descending"
                          ? "neo-icon-arrow-up"
                          : "neo-icon-arrow-down"
                      }
                    />
                  )}
                </div>
              ) : (
                column.render("Header")
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

// TODO-567: add unit tests
export const calculateAriaSortValue = (
  isSorted: boolean,
  sortedDir?: "descending" | "ascending"
): AriaAttributes["aria-sort"] => {
  let result: AriaAttributes["aria-sort"] = "none";

  if (isSorted && sortedDir === "descending") {
    result = "descending";
  } else if (isSorted && sortedDir === "ascending") {
    result = "ascending";
  } else if (isSorted) {
    result = "other";
  }

  return result;
};

import { CSSProperties } from "react";

import { Checkbox } from "components/Checkbox";
import { Keys } from "utils";

import { calculateAriaSortValue } from "../helpers";
import { TableHeaderProps } from "../types";

/**
 * There are more filtering examples to be found here:
 * https://codesandbox.io/s/github/tannerlinsley/react-table/tree/master/examples/filtering?file=/src/App.js
 */

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
  handleRowToggled = (_1: string[], _2?: T) => {},
  instance,
  selectableRows,
  translations,
}: TableHeaderProps<T>) => {
  const {
    rowsById,
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
                checked={checkboxCheckedValue}
                isLabelHidden
                label={translations.selectAll}
                onChange={() => {
                  toggleAllRowsSelected();

                  if (handleRowToggled) {
                    const shouldSelectAll = [false, "indeterminate"].includes(
                      checkboxCheckedValue
                    );

                    handleRowToggled(
                      shouldSelectAll ? Object.keys(rowsById) : []
                    );
                  }
                }}
                value="all"
              />
            )}
          </th>
        )}
        {headers.map((column) => {
          const {
            canFilter,
            canSort,
            getHeaderProps,
            getSortByToggleProps,
            isSorted,
            isSortedDesc,
            isVisible,
            render,
          } = column;

          const sortedDir = isSortedDesc ? "descending" : "ascending";
          const ariasort = calculateAriaSortValue(isSorted, sortedDir);

          let content = column.render("Header");
          if (canFilter) {
            content = column.render("Filter");
          } else if (canSort) {
            const thDivProps = getSortByToggleProps({
              title: translations?.sortBy,
            });

            content = (
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
            );
          }

          const styles: CSSProperties = {
            display: isVisible ? "table-cell" : "none",
            width: column.width,
            minWidth: column.minWidth,
            maxWidth: column.maxWidth,
          };

          return (
            <th
              style={styles}
              {...getHeaderProps()}
              scope="col"
              aria-sort={ariasort}
            >
              {content}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

import { CSSProperties, useContext } from "react";

import { Checkbox } from "components/Checkbox";
import { Icon } from "components/Icon";
import { Menu, MenuItem } from "components/Menu";
import { IconNamesType, Keys } from "utils";

import { calculateAriaSortValue, FilterContext } from "../helpers";
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
    headers,
    page,
    rowsById,
    state: { selectedRowIds },
    toggleAllRowsSelected,
    toggleSortBy,
  } = instance;

  const { toggleFilterSheetVisible } = useContext(FilterContext);

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
            clearSortBy,
            getHeaderProps,
            getSortByToggleProps,
            isSorted,
            isSortedDesc,
            isVisible,
            render,
          } = column;

          const sortedDir = isSortedDesc ? "descending" : "ascending";
          const ariasort = calculateAriaSortValue(isSorted, sortedDir);

          let content = render("Header");
          if (canFilter && column.Filter) {
            content = render("Filter");
          } else if (canSort) {
            const thDivProps = getSortByToggleProps({
              title: translations?.sortBy,

              // this is necessary to keep the "down" button from triggering sort+pagescroll
              onClick: (e) => {
                e.stopPropagation();
                e.preventDefault();
              },
            });

            const sortIcon: IconNamesType =
              isSorted === false
                ? "sort"
                : ariasort === "descending"
                ? "arrow-up"
                : "arrow-down";

            content = (
              <Menu
                menuRootElement={
                  <div
                    className="neo-multiselect"
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
                  >
                    {render("Header")}

                    <Icon
                      icon={sortIcon}
                      aria-label={sortIcon.replace(/-/g, " ")}
                    />

                    <Icon icon="chevron-down" aria-label="menu icon" />
                  </div>
                }
                {...thDivProps}
              >
                <MenuItem onClick={clearSortBy} disabled={!column.isSorted}>
                  {translations.clearSort || "Clear Sort"}
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    toggleSortBy(column.id, false, false);
                  }}
                >
                  A - Z
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    toggleSortBy(column.id, true, false);
                  }}
                >
                  Z - A
                </MenuItem>

                <MenuItem onClick={toggleFilterSheetVisible}>
                  {translations.filterColumn || "Filter Column"}
                </MenuItem>
              </Menu>
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

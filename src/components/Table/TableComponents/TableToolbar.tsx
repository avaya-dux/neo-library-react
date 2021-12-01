import { useCallback, useEffect, useState } from "react";

import { IconButton } from "components/IconButton";
import { TextInput } from "components/TextInput";

import { TableToolbarProps } from "../types";

/**
 * TableToolbar is used by the Table component to render the search and action inputs for the table
 *
 * @example
 * <TableToolbar
 *  handleRefresh={handleRefresh}
 *  instance={instance}
 *  readonly={true}
 *  translations={translations}
 * />
 */
export const TableToolbar = <T extends Record<string, any>>({
  handleRefresh,
  instance,
  readonly = false,
  translations,
}: TableToolbarProps<T>) => {
  const { data, setGlobalFilter, state } = instance;

  const [search, setSearch] = useState<string>(state.globalFilter || "");
  const setSearches = useCallback(
    (searchString) => {
      setSearch(searchString);
      setGlobalFilter(searchString);
    },
    [setSearch, setGlobalFilter]
  );

  useEffect(() => {
    // handle data update (e.g. new/more data pulled from server)
    setSearches(search);
  }, [data, setSearches]);

  return (
    <div className="neo-table__actions">
      {readonly === false && (
        <div className="neo-table__actions--left">
          {/* TODO-567: action buttons */}
        </div>
      )}

      <div className="neo-table__actions--right">
        <div className="neo-form">
          <TextInput
            aria-label={translations.searchInputPlaceholder}
            placeholder={translations.searchInputPlaceholder}
            startIcon="search"
            value={search}
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSearches(e.currentTarget.value);
            }}
          />
        </div>

        {handleRefresh && (
          <IconButton
            aria-label={translations.refresh || "Refresh"}
            icon="refresh"
            onClick={handleRefresh}
            shape="square"
            variant="tertiary"
          />
        )}
      </div>
    </div>
  );
};

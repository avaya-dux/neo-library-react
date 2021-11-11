import { Tooltip } from "components/Tooltip";

import { PaginationProps } from "..";

export const PaginationItemsPerPageSelection = ({
  ariaLabelForShownPagesSelect = "items per page", // TODO: localize
  itemsPerPage,
  itemsPerPageOptions = [],
  onItemsPerPageChange,
}: Pick<
  PaginationProps,
  | "ariaLabelForShownPagesSelect"
  | "itemsPerPage"
  | "itemsPerPageOptions"
  | "onItemsPerPageChange"
>) => {
  if (itemsPerPageOptions.length <= 0) {
    return null;
  }

  return (
    <Tooltip
      id={`pagination-items-per-page-selection-${ariaLabelForShownPagesSelect}`}
      label={ariaLabelForShownPagesSelect}
    >
      {/* // TODO-618: use our Select component when it is available */}
      <select
        aria-label={ariaLabelForShownPagesSelect}
        defaultValue={itemsPerPage}
        onBlur={(e) => {
          onItemsPerPageChange &&
            onItemsPerPageChange(e, parseInt(e.target.value, 10));
        }}
        onChange={(e) => {
          onItemsPerPageChange &&
            onItemsPerPageChange(e, parseInt(e.target.value, 10));
        }}
      >
        {itemsPerPageOptions.map((option, i) => (
          <option key={`option-${i}-${option}`} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Tooltip>
  );
};

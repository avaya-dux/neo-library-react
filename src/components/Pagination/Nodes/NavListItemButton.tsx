import { Button } from "components";

import { PaginationNavigationProps } from "../PaginationTypes";

/**
 * This component is used by the `PaginationNavigation` component and the
 * helper method `buildNavItems` to render a single `<li>` element that
 * links to a "page" of pagination data.
 *
 * @example
 * <NavListItemButton
 *  isCurrentPage={index === currentPageIndex}
 *  key={`unique-key-${index}`}
 *  onPageChange={onPageChange}
 *  pageToNavigateTo={index}
 * />
 */
export const NavListItemButton = ({
  isCurrentPage,
  onPageChange,
  pageToNavigateTo,
}: {
  pageToNavigateTo: number;
  isCurrentPage?: boolean;
} & Pick<PaginationNavigationProps, "onPageChange">) => (
  <li>
    <Button
      label={`${pageToNavigateTo}`}
      variant={isCurrentPage ? "secondary" : "tertiary"}
      onClick={(e) => onPageChange(e, pageToNavigateTo)}
      disabled={isCurrentPage}
    />
    {/* TODO-696: update to use `children` instead of `label` when 696 is completed */}
    {/* <Button
      variant="tertiary"
      onClick={(e) => onPageChange(e, pageToNavigateTo)}
    >
      {pageToNavigateTo}
    </Button> */}
  </li>
);

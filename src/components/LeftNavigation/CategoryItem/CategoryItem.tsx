import { Fragment, FunctionComponent, ReactElement } from "react";
import { IconProps } from "components/Icon";

export interface CategoryItemProps {
  id?: string;
  label: string;
  icon?: ReactElement<IconProps>;
  expanded?: boolean;
  disabled?: boolean;
  active?: boolean;
  selectedItem?: string;
}

/**
 * Is meant to wrap an array of `LinkItem`. TODO: Replace with LinkItem
 *
 * @example
 * <CategoryItem>
 *   <ListItem> First Item </LinkItem>
 *   <LinkItem> Second Item </LinkItem>
 *   <LinkItem> Third Item </LinkItem>
 * </CategoryItem>


 * @see https://design.avayacloud.com/components/web/list-web
 */
export const CategoryItem: FunctionComponent<CategoryItemProps> = ({
  children,
  id,
  label,
  icon,
  expanded,
  disabled,
  active,
  selectedItem,
}) => {
  const ItemClass = "neo-group-list--actions";

  return (
    <Fragment>
      <div aria-label={label} className="neo-icon-contact">
        {label}
        <span className="neo-icon-chevron-left"></span>
      </div>
      <ul className={ItemClass} id={id}>
        {children}
      </ul>
    </Fragment>
  );
};

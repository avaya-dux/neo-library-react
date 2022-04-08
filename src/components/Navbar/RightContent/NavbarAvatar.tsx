import { cloneElement, FunctionComponent, ReactElement } from "react";

import { AvatarProps } from "components/Avatar";
import { MenuProps } from "components/Menu";

export interface NavbarAvatarProps {
  avatar: ReactElement<Omit<AvatarProps, "size" | "border" | "status">>;
  dropdown?: ReactElement<Partial<MenuProps>>;
}

export const NavbarAvatar: FunctionComponent<NavbarAvatarProps> = ({
  avatar,
  dropdown,
}) => {
  const isWithDropdown = dropdown
    ? cloneElement(avatar, {
        className: "neo-dropdown__link-header neo-avatar--medium",
      })
    : avatar;

  return dropdown ? (
    <>
      {cloneElement(dropdown, {
        menuRootElement: isWithDropdown,
      })}
    </>
  ) : (
    <>{isWithDropdown}</>
  );
};
